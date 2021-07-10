class Room < ApplicationRecord
    include FriendlyId
    friendly_id :slug, use: :slugged

    validates :slug, presence: true, uniqueness: true
    validates :inviter_code, presence: true

    def inviter_pick
        inviter_starts? ? 'x' : 'o'
    end

    def challenger_pick
        inviter_starts? ? 'o' : 'x'
    end
end
