require "test_helper"

class RoomsControllerTest < ActionDispatch::IntegrationTest
  test "should create room" do
    assert_difference('Room.count') do
      post rooms_url, params: {
        room: {
          slug: 'my-awesome-match',
          inviter_code: 'random-player-1',
          inviter_starts: true
        }
      }
    end
    assert_response :success, Room.last
  end

  test "should return an error when bad request" do
    assert_no_difference('Room.count') do
      post rooms_url, params: {
        room: {
          inviter_code: 'random-player-1',
          inviter_starts: true
        }
      }
    end
    assert_response :bad_request, "Validation failed: Slug can't be blank"
  end

  test "should join a room as a inviter" do
    room = Fabricate(:room, challenger_code: nil)

    post room_join_url(room), params: {
      room: {
        challenger_code: 'random_player_1'
      }
    }
    assert_response :success
    assert_equal JSON.parse(response.body)['symbol'], 'x'
    room.reload
    assert_equal room.challenger_code, nil
  end

  test "should join a room as a challenger" do
    room = Fabricate(:room, challenger_code: nil)

    post room_join_url(room), params: {
      room: {
        challenger_code: 'random_player_2'
      }
    }
    assert_response :success
    assert_equal JSON.parse(response.body)['symbol'], 'o'
    room.reload
    assert_equal room.challenger_code, 'random_player_2'
  end
end
