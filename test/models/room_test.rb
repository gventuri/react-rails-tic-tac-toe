require "test_helper"

class RoomTest < ActiveSupport::TestCase
  test "should return the right inviter and challenger pick" do
    room = Fabricate(:room)

    assert_equal 'x', room.inviter_pick
    assert_equal 'o', room.challenger_pick

    room.update!(inviter_starts: false)

    assert_equal 'o', room.inviter_pick
    assert_equal 'x', room.challenger_pick
  end

  test "should not create a room when missing slug" do
    assert_no_difference "Room.count" do
      assert_raises ActiveRecord::RecordInvalid do
        Room.create!(slug: nil, inviter_code: 'random-player-1')
      end
    end
  end

  test "should not create a room when missing inviter_code" do
    assert_no_difference "Room.count" do
      assert_raises ActiveRecord::RecordInvalid do
        Room.create!(slug: 'my-awesome-match', inviter_code: nil)
      end
    end
  end

  test "should not create 2 rooms with the same slug" do
    room = Fabricate(:room)

    assert_no_difference "Room.count" do
      assert_raises ActiveRecord::RecordInvalid do
        Room.create!(slug: room.slug, inviter_code: 'random-player-1')
      end
    end
  end
end
