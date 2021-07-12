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

  private
    # Only allow a list of trusted parameters through.
    def create_params
      params.require(:room).permit(:slug, :inviter_code, :inviter_starts)
    end
end
