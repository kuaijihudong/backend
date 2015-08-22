class AddColumnsToCases < ActiveRecord::Migration
  def change
    add_column :cases, :finished_date, :string
    add_column :cases, :tag_id, :integer
    add_attachment :cases, :banner
    add_column :cases, :cases_type_id, :integer
  end
end
