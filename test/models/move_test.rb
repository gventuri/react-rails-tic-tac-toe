require "test_helper"

class MoveTest < ActiveSupport::TestCase
  test "should not create a move on a duplicate cell for the same room" do
    move = Fabricate(:move, cell_id: 0)
    assert_no_difference "Move.count" do
      assert_raises ActiveRecord::RecordInvalid do
        move.room.moves.create!(player_code: move.player_code, cell_id: 0)
      end
    end
  end
end
