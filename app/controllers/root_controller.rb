class RootController < ApplicationController
  before_filter :require_logged_in_user

  def root
    puts "=" * 80
    if params[:id]
      @user = User.find(params[:id])
      p @user if @user
    end
    puts "=" * 80
    render :root
  end
end
