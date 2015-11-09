class PostsController < ApplicationController
  before_action :require_current_user

  def index
    @posts = current_user.posts.includes(:comments)
  end

  def create
    @post = current_user.posts.new(post_params)

    if @post.save

    else
      render json: {
        error: {
          message: @post.errors.full_messages.to_sentence
        }
      }
    end
  end

  private

  def post_params
    return params.require(:post)
            .permit(:title, :description)
  end
end
