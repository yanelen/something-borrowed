class UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      redirect_to root_path
    else
      @user.errors.full_messages.to_sentence
      redirect_to '/signup'
    end
  end

  def signup
    render '/signup'
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
