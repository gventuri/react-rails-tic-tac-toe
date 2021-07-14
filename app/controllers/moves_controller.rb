class MovesController < ApplicationController
  before_action :set_room, only: [:create]

  # POST /rooms/:slug/moves or /rooms/:slug/moves.json
  def create
    move = @room.moves.create!(create_params)

    render json: move, status: :ok
  rescue ActiveRecord::RecordInvalid => e
    render json: { error: e.message }, status: :bad_request
  end

  private
    def set_room
      @room = Room.friendly.find(params[:room_id])
    end

    # Only allow a list of trusted parameters through.
    def create_params
      params.require(:move).permit(:player_code, :cell_id)
    end
end
