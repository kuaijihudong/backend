class BlogsController < ApplicationController

  before_action :authenticate_admin!

  def new
    @blog = Blog.new
  end


  def create
    
  end

  def edit

  end


  def update
  end
end
