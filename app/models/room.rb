class Room < ApplicationRecord
    include FriendlyId
    friendly_id :slug, use: :slugged

    has_many :moves

    validates :slug, presence: true, uniqueness: true
    validates :inviter_code, presence: true

    def inviter_pick
        inviter_starts? ? 'x' : 'o'
    end

    def challenger_pick
        inviter_starts? ? 'o' : 'x'
    end

    def symbol_for_player(player_code)
        return unless player_in_the_room?(player_code)
        return inviter_pick if player_code == inviter_code
        challenger_pick
    end

    def player_in_the_room?(player_code)
        player_code == inviter_code || player_code == challenger_code
    end

    def full?
        challenger_code.present?
    end

    def inviter?(player_code)
        player_code = inviter_code
    end

    def challenger?(player_code)
        player_code = challenger_code
    end

    def inviter_moves
        moves.where(player_code: inviter_code)
    end

    def challenger_moves
        moves.where(player_code: challenger_code)
    end

    def player_moves(player_code)
        moves.where(player_code: player_code)
    end

    def player_moves_next?(player_code)
        starts = inviter?(player_code) && inviter_starts? || challenger?(player_code) && !inviter_starts?

        return true if player_moves(player_code).size < moves.size / 2
        return true if starts && player_moves(player_code).size <= moves.size / 2
        false
    end
end
