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

  test "should return an error when bad request" do
    move = Fabricate(:move, cell_id: 0)

    assert_no_difference('Move.count') do
      post room_moves_url(move.room), params: {
        move: {
          cell_id: 0,
          player_code: 'random_player_2'
        }
      }
    end
    assert_response :bad_request, "Validation failed: Slug can't be blank"
  end

  test "should not allow a non-playing user to make a move" do
    room = Fabricate(:room)

    assert_no_difference('Move.count') do
      post room_moves_url(room), params: {
        move: {
          cell_id: 0,
          player_code: 'wrong_player_1'
        }
      }
      assert_response :unauthorized
    end
  end

  test "should not allow a user to play twice in a row" do
    room = Fabricate(:room)

    assert_difference('Move.count') do
      post room_moves_url(room), params: {
        move: {
          cell_id: 0,
          player_code: 'random_player_1'
        }
      }
      assert_response :success
    end

    assert_no_difference('Move.count') do
      post room_moves_url(room), params: {
        move: {
          cell_id: 1,
          player_code: 'random_player_1'
        }
      }
      assert_response :unauthorized
    end
  end
end
