class SessionsController < ApplicationController

  def new
    @user = User.new(username: "user", password: "password")
  end

  def create
    user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if user
      sign_in(user)
      redirect_to('/')
    else
      flash.now[:errors] = ["Invalid username or password"]
      render :new
    end
  end

  def destroy

  end

end
