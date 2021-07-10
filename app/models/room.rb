class Room < ApplicationRecord
    validates :slug, presence: true, uniqueness: true
    validates :inviter_code, presence: true

    def inviter_pick
        inviter_starts? ? 'x' : 'o'
    end

    def challenger_pick
        inviter_starts? ? 'o' : 'x'
    end
end
