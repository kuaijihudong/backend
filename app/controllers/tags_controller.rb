class TagsController < ApplicationController

    before_action :authenticate_admin!, except: [:index, :show, :create]
    before_action :auth, only: [:index, :show, :create]
    def new
      @tag = Tag.new
    end


    def create
      @tag = Tag.new(permitted_params)
      if @tag.save
        flash[:notice] = "发布成功"
        redirect_to action: :index
      else
        render action: :new
      end
    end

    def edit
      @tag = Tag.find_by_id(params[:id])
    end

    def show
      @tag = Tag.find_by_id(params[:id])
    end


    def update
      @tag = Tag.find_by_id(params[:id])
      if @tag.update_attributes(permitted_params)
        flash[:notice] = "修改成功"
        redirect_to action: :index
      else
        render action: :edit
      end
    end

    def destroy
      @tag = Tag.find_by_id(params[:id])
      @tag.delete
      flash[:notice] = "删除成功"
      redirect_to action: :index
    end

    def index
      @tags = Tag.all
    end


    private
    def permitted_params
      params.require(:tag).permit([:name, :description])
    end
end
