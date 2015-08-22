class CasesTypesController < ApplicationController

  before_action :authenticate_admin!, except: [:index, :show, :create]
  before_action :auth, only: [:index, :show, :create]
  def new
    @cases_type = CasesType.new
  end


  def create
    @cases_type = CasesType.new(permitted_params)
    if @cases_type.save
      flash[:notice] = "发布成功"
      redirect_to action: :index
    else
      render action: :new
    end
  end

  def edit
    @cases_type = CasesType.find_by_id(params[:id])
  end

  def show
    @cases_type = CasesType.find_by_id(params[:id])
  end


  def update
    @casestype = CasesType.find_by_id(params[:id])
    if @casestype.update_attributes(permitted_params)
      flash[:notice] = "修改成功"
      redirect_to action: :index
    else
      render action: :edit
    end
  end

  def destroy
    @cases_type = CasesType.find_by_id(params[:id])
    @cases_type.delete
    flash[:notice] = "删除成功"
    redirect_to action: :index
  end

  def index
    @cases_types = CasesType.all
  end


  private
  def permitted_params
    params.require(:cases_type).permit([:name, :description])
  end

end
