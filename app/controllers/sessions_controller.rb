class SessionsController < ApplicationController
  def new
    render :new
  end

  def create
    @user = User.find_by_credentials(params[:user])

    if @user
      login!(@user)
      flash[:success] = "Welcome back, #{@user.username}."
      redirect_to user_url(@user)
    else
      flash.now[:error] = ["Invalid Username/Password Combination"]
      render :new
    end
  end

  def destroy
    logout!(current_user)
    redirect_to new_session_url
  end
end
