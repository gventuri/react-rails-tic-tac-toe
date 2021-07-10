class Room < ApplicationRecord
    def inviter_pick
        inviter_starts? ? 'x' : 'o'
    end

    def challenger_pick
        inviter_starts? ? 'o' : 'x'
    end
end
