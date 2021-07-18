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

  test "should identify the current player" do
    room = Fabricate(:room)
    assert room.player_moves_next?('random_player_1')

    room.moves.create(cell_id: 0, player_code: 'random_player_1')
    room.player_moves_next?('random_player_2')

    room.moves.create(cell_id: 1, player_code: 'random_player_2')
    room.player_moves_next?('random_player_1')
  end
end
