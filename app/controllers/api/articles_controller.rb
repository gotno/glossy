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
    @articles = current_user.articles.includes(:sections)
    render :index
  end

  def show
    #this doesn't appear to reduce the number of queries...
    #@article = Article.includes(:sections).find(params[:id])
    
    @article = Article.find(params[:id])
    render :show
  end
end
