class ArticlesController < ApplicationController
  before_filter :require_logged_in_user, except: [:show, :index]

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

  def edit
    @article = Article.find(params[:id])
    @article_json = render_to_string template: '/api/articles/article',
                                     layout: false,
                                     locals: { article: @article } 
  end

  def show
    @article = Article.find(params[:id])
    @article_json = render_to_string template: '/api/articles/article',
                                     layout: false,
                                     locals: { article: @article } 
  end
end
