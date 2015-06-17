class HomeController < ApplicationController
  before_action :authenticate_admin!
  def index
    @blogs = Blog.all
    @contacts = Contact.all
  end
end
