class BlogsController < ApplicationController

  before_action :authenticate_admin!

  def new
    @blog = Blog.new
  end


  def create
    @blog = Blog.new(permitted_params)
    @blog.created_by = current_admin.id
    if @blog.save
      flash[:notice] = "发布成功"
      redirect_to root_path
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
      redirect_to root_path
    else
      render action: :edit
    end
  end

  def delete
    @blog = Blog.find_by_id(params[:id])
    @blog.delete
    flash[:notice] = "删除成功"
    redirect_to root_path
  end


  private
  def permitted_params

    params.require(:blog).permit([:title, :blog_type, :description, :content,
        :banner, :seo_keywords, :seo_description, :from, :tag])
  end
end
