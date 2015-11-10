class PostsController < ApplicationController
  skip_before_action verify_authenticity_token
  skip_before_action :require_current_user

  def testangular
    render '/testangular', layout: "angularlayout"
  end

  def index
    @posts = Post.all.includes(:comments)
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

  def update
    post = Post.find_by(post_id: params[:post_id])
    @post = post.update(post_params)

    if @post.save

    else
      render json: {
        error: {
          message: @post.errors.full_messages.to_sentence
        }
      }
    end
  end

  def destroy
    post = Post.find_by(post_id: params[:post_id])
    post.destroy
  end

  private

  def post_params
    return params.require(:post)
            .permit(:title, :description)
  end
end
