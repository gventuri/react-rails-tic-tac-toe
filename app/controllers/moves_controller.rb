class MovesController < ApplicationController
  before_action :set_room, only: [:index, :create]

  # GET /rooms/:slug/moves or /rooms/:slug/moves.json
  def index
    @moves = @room.moves
  end

  # POST /rooms/:slug/moves
  def create
    move = @room.moves.create!(create_params)

    ActionCable.server.broadcast 'moves_channel', JSON.parse(return_details(move))

    render json: return_details(move), status: :ok
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

    def return_details(move)
      ApplicationController.render(
        template: "moves/_move.json.jbuilder",
        locals: { move: move }
      )
    end
end
