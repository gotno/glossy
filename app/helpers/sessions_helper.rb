module SessionsHelper
  def login!(user)
    @current_user = user
    session[:session_token] = user.session_token
  end

  def logout!(user)
    @current_user = nil
    user.reset_session_token!
    session[:session_token] = nil
  end

  def logged_in?
    !!current_user
  end

  def current_user
    @current_user || User.find_by_session_token(session[:session_token])
  end

  def require_logged_in_user
    redirect_to new_session_url unless logged_in?
  end
end
