class UserController < ApplicationController
  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
    render json: @user, status: 201
  end

  def get_current_user
    @user = current_user
    render json: @user, status: 201
  end


end
