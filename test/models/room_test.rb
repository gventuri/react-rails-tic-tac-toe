require "test_helper"

class RoomTest < ActiveSupport::TestCase
  test "should return the rigth inviter and challenger pick" do
    room = Fabricate(:room)

    assert_equal 'x', room.inviter_pick
    assert_equal 'o', room.challenger_pick

    room.update!(inviter_starts: false)

    assert_equal 'o', room.inviter_pick
    assert_equal 'x', room.challenger_pick
  end
end
