require "test_helper"

class RoomsChannelTest < ActionCable::Channel::TestCase
  test "subscribes to RoomsChanel" do
    subscribe
    assert subscription.confirmed?
  end
end
