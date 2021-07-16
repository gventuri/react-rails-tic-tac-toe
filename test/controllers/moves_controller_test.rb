require "test_helper"

class MovesControllerTest < ActionDispatch::IntegrationTest
  test "should load all moves" do
    room = Fabricate(:room)

    get room_moves_url(room), as: :json
    assert_response :success, room.moves
  end

  test "should create move" do
    room = Fabricate(:room)

    assert_difference('Move.count') do
      post room_moves_url(room), params: {
        move: {
          cell_id: 0,
          player_code: 'random_player_1'
        }
      }
    end
    assert_response :success, Room.last
  end

  test "should return an error when bad request " do
    move = Fabricate(:move, cell_id: 0)

    assert_no_difference('Move.count') do
      post room_moves_url(move.room), params: {
        move: {
          cell_id: 0,
          player_code: 'random_player_1'
        }
      }
    end
    assert_response :bad_request, "Validation failed: Slug can't be blank"
  end
end
