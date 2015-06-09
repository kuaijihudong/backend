class AddUserNameToAdmins < ActiveRecord::Migration
  def change
    add_column :admins, :user_name, :string, null: false, default: ""
  end
end
