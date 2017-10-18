class CommentsController < ApplicationController
  protect_from_forgery

  def create
  end

  private
  def comments_params
    params.require(:comment).permit(:text, :user_id, :company_id)
  end
end
