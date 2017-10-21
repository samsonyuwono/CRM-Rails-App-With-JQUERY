class CommentsController < ApplicationController
  protect_from_forgery

  def index
    @comments = Comment.all
    render json: @comments
  end

  def new
    @comment = @company.comments.build
  end

  def create
    @company = Company.find(params[:company_id])
    @comment = current_user.comments.build(comment_params)
    render json: @comment, status: 201
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
    render json: @comment
  end

  private
  def comments_params
    params.require(:comment).permit(:text, :user_id, :company_id)
  end
end
