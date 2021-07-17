require "test_helper"

class MovesChannelTest < ActionCable::Channel::TestCase
  test "subscribes to MovesChanel" do
    subscribe
    assert subscription.confirmed?
  end
end
