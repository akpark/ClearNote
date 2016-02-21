class Api::UsersController < ApplicationController
  def show
    @users = User.all
    render :index
  end

  def create
    @user = User.create(user_params)
    if @user.save
      sign_in(@user)
      render 'api/users/show'
    else
      flash[:errors] = @user.errors.full_messages
      render json: flash[:errors], status: 401
    end

  end

  protected
  def user_params
    self.params.require(:user).permit(:username, :password)
  end
end
