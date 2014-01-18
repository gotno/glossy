class UsersController < ApplicationController
  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(params[:user])

    if @user.save
      login!(@user)
      flash[:success] = "Welcome, #{@user.username}!"
      redirect_to user_url(@user)
    else
      flash.now[:error] = @user.errors.full_messages
      render :new
    end
  end

  def edit
    @user = User.find(params[:id])
    render :edit
  end

  def update
  end

  def show
    @user = User.find(params[:id])
    @articles = Article.find_by_user_id(params[:id])
    render :show
  end
end
