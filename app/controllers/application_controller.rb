class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception


  def auth
    if current_admin.blank? && params[:apikey] != CONFIG["apikey"]
      render plain: "401 Unauthorized", status: 401
    end
  end
end
