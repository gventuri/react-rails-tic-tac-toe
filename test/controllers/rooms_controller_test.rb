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

  test "should restart a match that is over" do
    room = Fabricate(:room)
    (0..8).each do |i|
      room.moves.create!(
        cell_id: i,
        player_code: "random_player_#{(i % 2) + 1}"
      )
    end

    put room_rematch_url(room)
    assert_response :success
  end

  test "should restart a match with a winner" do
    room = Fabricate(:room)
    room.moves.create!( cell_id: 0, player_code: "random_player_1")
    room.moves.create!( cell_id: 3, player_code: "random_player_2")
    room.moves.create!( cell_id: 1, player_code: "random_player_1")
    room.moves.create!( cell_id: 4, player_code: "random_player_2")
    room.moves.create!( cell_id: 2, player_code: "random_player_1")

    put room_rematch_url(room)
    assert_response :success
  end

  test "should not restart a match that is NOT over" do
    room = Fabricate(:room)

    put room_rematch_url(room)
    assert_response :unauthorized
  end
end
