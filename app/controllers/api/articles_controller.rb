class Api::ArticlesController < ApplicationController
  before_filter :require_logged_in_user

  def create
    @article = current_user.articles.build(params[:article]);
    if @article.save
      render json: @article
    else
      render json: @article.errors.full_messages, status: 422
    end
  end

  def destroy
  end

  def index
    @articles = current_user.articles
    render :index
  end

  def show
    @article = Article.find(params[:id])
    render :show
  end
end
