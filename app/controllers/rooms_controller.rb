class RoomsController < ApplicationController
  # GET /rooms/:slug
  def show
    @room = Room.friendly.find(params[:id])
  end
  
  # POST /rooms or /rooms.json
  def create
    @room = Room.create!(create_params)

    render json: @room, status: :ok, location: room_path(@room)
  rescue ActiveRecord::RecordInvalid => e
    render json: { error: e.message }, status: :bad_request
  end

  def join
    @room = Room.friendly.find(params[:room_id])
    player_code = params[:room][:challenger_code]
    return head :bad_request if @room.full? && !@room.player_in_the_room?(player_code)

    @room.update!(join_params) unless @room.player_in_the_room?(player_code)
    set_player_cookie(player_code)
    render json: { symbol: @room.symbol_for_player(player_code) }, status: :ok
  end

  def rematch
    @room = Room.friendly.find(params[:room_id])
    return head :unauthorized unless @room.over?

    @room.rematch!
    RoomsChannel.broadcast_to @room, { rematch: true }
    head :ok
  end

  private
    # Only allow a list of trusted parameters through.
    def create_params
      params.require(:room).permit(:slug, :inviter_code, :inviter_starts)
    end

    def join_params
      params.require(:room).permit(:challenger_code)
    end

    def set_player_cookie(player_code)
      cookies[:player_code] = player_code
    end
end
