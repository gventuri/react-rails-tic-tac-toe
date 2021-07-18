require "test_helper"

class ApplicationCable::ConnectionTest < ActionCable::Connection::TestCase
  test "connects with player code" do
    cookies[:player_code] = 'random_player_1'
    connect

    assert_equal connection.current_user, 'random_player_1'
  end

  test "rejects connection without player code" do
    assert_reject_connection { connect }
  end
end