class CommentsController < ApplicationController
  def create
    post = Post.find(params[:post_id])

    @comment = post.comments.new(comment_params)

    if @comment.save

    else
      render json: {
        error: {
          message: @comment.errors.full_messages.to_sentence
        }
      }
    end
  end

  def destroy
    comment = Comment.where(params[:post_id])
    comment.destroy
  end

  private

  def comment_params
    return params.require(:comment)
      .permit(:user_id, :comment)
    end
end
