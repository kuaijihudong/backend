class ChangeTypeToBlogTypeToBlog < ActiveRecord::Migration
  def change
    remove_column :blogs, :type
    add_column :blogs, :blog_type, :integer, null: false
  end
end
