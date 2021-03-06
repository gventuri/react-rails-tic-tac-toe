class Move < ApplicationRecord
    belongs_to :room, dependent: :destroy

    validates :cell_id, uniqueness: { scope: :room }

    def symbol
        room.symbol_for_player(player_code)
    end
end
