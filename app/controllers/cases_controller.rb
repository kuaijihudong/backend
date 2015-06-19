# encoding: utf-8
class CasesController < ApplicationController

    before_action :authenticate_admin!
    def index
      @cases = Case.all
    end

    def new
      @case = Case.new
    end


    def create
      @case = Case.new(permitted_params)
      if @case.save
        flash[:notice] = "发布成功"
        redirect_to action: :index
      else
        render action: :new
      end
    end


    def show
      @case = Case.find_by_id(params[:id])
      
    end

    def edit
      @case = Case.find_by_id(params[:id])
    end


    def update
       @case = Case.find_by_id(params[:id])

      # @blog.created_by = current_admin.id
      if @case.update_attributes(permitted_params)
        flash[:notice] = "修改成功"
        redirect_to action: :index
      else
        render action: :edit
      end
    end

    def destroy
      @case = Case.find_by_id(params[:id])
      @case.delete
      flash[:notice] = "删除成功"
      redirect_to action: :index
    end


    private
    def permitted_params
      params.require(:case).permit([:name, :description, :client_name, :location, :images,
        :case_type, :seo_description, :seo_keywords, :logo, :url])
    end
end
