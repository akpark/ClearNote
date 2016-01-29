class Api::UsersController < ApplicationController
  def show
    @users = User.all
    render :index
  end

  def create
    @user = User.find(params[:id])
    render :show
  end

  protected
  def user_params
    self.params.require(:user).permit(:username, :password)
  end
end
