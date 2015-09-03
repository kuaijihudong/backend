class AddNewColumnsToCases < ActiveRecord::Migration
  def change
    add_attachment :cases, :background_image
    add_column :cases, :overview, :text
    add_attachment :cases, :homepage_image
  end
end
