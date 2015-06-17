# encoding: utf-8
class ContactsController < ApplicationController
  before_action :authenticate_admin!

  def new
    @contact = Contact.new
  end


  def create
    @contact = Contact.new(permitted_params)
    if @contact.save
      flash[:notice] = "发布成功"
      redirect_to action: :index
    else
      render action: :new
    end
  end

  def edit
    @contact = Contact.find_by_id(params[:id])
  end

  def show
    @contact = Contact.find_by_id(params[:id])
  end


  def update
    @contact = Contact.find_by_id(params[:id])
    if @contact.update_attributes(permitted_params)
      flash[:notice] = "修改成功"
      redirect_to action: :index
    else
      render action: :edit
    end
  end

  def destroy
    @contact = Contact.find_by_id(params[:id])
    @contact.delete
    flash[:notice] = "删除成功"
    redirect_to action: :index
  end

  def index
    @contacts = Contact.all
  end


  private
  def permitted_params
    params.require(:contact).permit([:contact_person, :contact_information, :contact_content])
  end

end
