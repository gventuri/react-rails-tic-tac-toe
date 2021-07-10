require "test_helper"

class HomepageControllerTest < ActionDispatch::IntegrationTest
  test 'should render homepage' do
    get root_url
    assert_response :success
  end

  test 'should render react component' do
    get root_url
    assert_react_component "App"
  end
end
