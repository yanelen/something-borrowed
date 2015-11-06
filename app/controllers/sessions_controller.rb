class SessionController < ApplicationController
  # skip_before_action :verify_authenticity_token, only: :create

  def create
    user = User.find_by(username: user_params[:username])

    if user && user.authenticate(user_params[:password])
      flash[:message] = "Logged in"
    else
      flash[:message] = "Username / Password combination does not exist!"
    end

    redirect_to application_home_path
  end

  def destroy
    log_out!

    redirect_to root_path
  end

  def current_user

  end

  private

  def user_params
    return params.require(:user).permit(:username, :password)
  end
end
