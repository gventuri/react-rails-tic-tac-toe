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
end
