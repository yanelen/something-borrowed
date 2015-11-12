class CommentsController < ApplicationController

  # skip_before_action :verify_authenticity_token

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
    puts "DESTROY METHOD!!!!!!!!!!!!"
    comments = Comment.where(params[:post_id])
    comments.each do |comment|
      comment.destroy
    end

    respond_to do |format|
      format.html { redirect_to root_path }
      format.json { head :no_content }
    end
  end


  private

  def comment_params
    return params.require(:comment)
      .permit(:user_id, :comment, :username, :created_at)
    end
end
