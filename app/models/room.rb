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
        return inviter_pick if player_code == inviter_code
        challenger_pick
    end
end
