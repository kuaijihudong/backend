# encoding: utf-8
class CasesController < ApplicationController

    before_action :authenticate_admin!, except: [:index, :show]
    before_action :auth, only: [:index, :show]
    def index
      @cases = Case.all

    end

    def new
      @case = Case.new
    end


    def create
      @case = Case.new(permitted_params)
      if @case.save
        #内页
        images = params[:case][:attachment]
        images.each do |a|
          Attachment.create(case: @case, image: a, attachment_type: 0)
        end
        #外页
        out_images = params[:case][:out_attachment]
        out_images.each do |a|
          Attachment.create(case: @case, image: a, attachment_type: 1)
        end
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
        :case_type, :seo_description, :seo_keywords, :overview, :logo, :url, :background_image, :homepage_image])
    end
end
