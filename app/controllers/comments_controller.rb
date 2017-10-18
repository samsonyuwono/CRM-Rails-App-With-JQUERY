class CommentsController < ApplicationController
  protect_from_forgery

  def new
    @comment = Comment.new
  end

  def create
    @comment = Comment.create(comments_params)
    render json: @comment, status: 201
  end

  private
  def comments_params
    params.require(:comment).permit(:text, :user_id, :company_id)
  end
end
