# encoding: utf-8
class BlogsController < ApplicationController

  before_action :authenticate_admin!, except: [:index, :show]
  def index
    @blogs = Blog.all
  end

  def new
    @blog = Blog.new
  end

  def show
    @blog = Blog.find_by_id(params[:id])
  end


  def create
    @blog = Blog.new(permitted_params)
    @blog.created_by = current_admin.id
    if @blog.save
      flash[:notice] = "发布成功"
      redirect_to action: :index
    else
      render action: :new
    end
  end

  def edit
    @blog = Blog.find_by_id(params[:id])
  end


  def update
     @blog = Blog.find_by_id(params[:id])

    # @blog.created_by = current_admin.id
    if @blog.update_attributes(permitted_params)
      flash[:notice] = "修改成功"
      redirect_to action: :index
    else
      render action: :edit
    end
  end

  def destroy
    @blog = Blog.find_by_id(params[:id])
    @blog.delete
    flash[:notice] = "删除成功"
    redirect_to action: :index
  end


  private
  def permitted_params
    params.require(:blog).permit([:title, :blog_type, :description, :content,
        :banner, :seo_keywords, :seo_description, :from, :tag])
  end
end
