class SessionController < ApplicationController
  # skip_before_action :verify_authenticity_token

  def create
    user = User.find_by(username: user_params[:username])

    if user && user.authenticate(user_params[:password])
      flash[:message] = "Logged in"

      token = SecureRandom.urlsafe_base64

      session[:session_token] = token
      user.update(session_token: token)

      redirect_to '/testangular'
    else
      flash[:message] = "Username / Password combination does not exist!"
      redirect_to root_path
    end

  end

  def destroy

    redirect_to "http://www.amazon.com/"
  end

  def user_current

  end

  private

  def user_params
    return params.require(:user).permit(:username, :password)
  end
end
