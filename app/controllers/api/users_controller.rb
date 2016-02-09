class Api::UsersController < ApplicationController
  def show
    @users = User.all
    render :index
  end

  def create
    @user = User.create(user_params)
    if @user
      sign_in(@user)
      render 'api/users/show'
    else
      flash[:errors] = @user.errors.full_messages
    end

  end

  protected
  def user_params
    self.params.require(:user).permit(:username, :password)
  end
end
