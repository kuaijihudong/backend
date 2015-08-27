class AddPublishedDate < ActiveRecord::Migration
  def change
    add_column :blogs, :published_date, :string
  end
end
