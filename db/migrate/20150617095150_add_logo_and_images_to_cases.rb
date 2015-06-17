class AddLogoAndImagesToCases < ActiveRecord::Migration
  def change
    add_attachment :cases, :logo
    add_attachment :cases, :images
  end
end
