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
    if @user.articles.length > 0
      @article = @user.articles
                      .order("created_at DESC")
                      .first
  #                    .includes(:sections)
  #                    .page(params[:page])
  #                    .per(1)

      @article_json = render_to_string template: '/api/articles/article',
                                       layout: false,
                                       locals: { article: @article } 
    end
    render :show
  end
end
