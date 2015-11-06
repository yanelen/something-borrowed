class UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      redirect to
    else
      @users.errors.full_messages.to_sentence
      redirect to
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
