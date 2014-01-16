class ArticlesController < ApplicationController
  before_filter :require_logged_in_user

  def new
    @article = Article.new
  end

  def create
    @article = current_user.articles.build(params[:article])

    if @article.save
      flash[:success] = "new article saved"
      redirect_to article_url(@article)
    else
      flash.now[:error] = @article.errors.full_messages
      render :new
    end
  end

  def show
    @article = Article.find(params[:id])
  end
end
