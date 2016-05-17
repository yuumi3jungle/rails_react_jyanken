require 'test_helper'

class JyankensControllerTest < ActionController::TestCase
  setup do
    @jyanken = jyankens(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:jyankens)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create jyanken" do
    assert_difference('Jyanken.count') do
      post :create, jyanken: { computer: @jyanken.computer, human: @jyanken.human, judgment: @jyanken.judgment }
    end

    assert_redirected_to jyanken_path(assigns(:jyanken))
  end

  test "should show jyanken" do
    get :show, id: @jyanken
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @jyanken
    assert_response :success
  end

  test "should update jyanken" do
    patch :update, id: @jyanken, jyanken: { computer: @jyanken.computer, human: @jyanken.human, judgment: @jyanken.judgment }
    assert_redirected_to jyanken_path(assigns(:jyanken))
  end

  test "should destroy jyanken" do
    assert_difference('Jyanken.count', -1) do
      delete :destroy, id: @jyanken
    end

    assert_redirected_to jyankens_path
  end
end
