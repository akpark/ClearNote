class Api::SessionsController < ApplicationController

  def show
    if current_user
      @user = current_user
      render "api/users/show"
    else
      render json: {}
    end
  end

  def create
    @user = User.find_by_credentials(
      params[:username],
      params[:password]
    )
    if @user.nil?
      render json: ["Incorrect email/password!"], status: 401
    else
      sign_in(@user)
      render 'api/users/show'
    end
  end

  def destroy
    sign_out
    flash[:success] = "Thank you, come again."
    render json: {}
  end

  def omniauth_google
    @user = User.find_or_create_by_auth_hash(auth_hash)
    sign_in!(@user)
    redirect_to root_url
  end

  def auth_hash
    request.env['omniauth.auth']
  end

end
