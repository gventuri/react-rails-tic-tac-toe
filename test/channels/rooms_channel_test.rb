require "test_helper"

class RoomsChannelTest < ActionCable::Channel::TestCase
  test "should subscribes to RoomsChannel" do
    room = Fabricate(:room)
    stub_connection current_user: room.inviter_code

    subscribe room_id: room.slug

    assert subscription.confirmed?
    assert_has_stream_for room
  end

  test "should reject the connection " do
    room = Fabricate(:room)
    stub_connection current_user: 'wrong_random_player_code'

    subscribe room_id: room.slug

    assert subscription.rejected?
  end
end
