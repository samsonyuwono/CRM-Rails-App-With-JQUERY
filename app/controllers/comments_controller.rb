class CommentsController < ApplicationController
  protect_from_forgery

  private
  def comments_params
    params.require(:comment).permit(:text, :user_id, :company_id) 
  end
end
