class CreateBlogs < ActiveRecord::Migration
  def change
    create_table :blogs do |t|
      t.string :title, null: false
      t.integer :type, null: false
      t.string :tag
      t.text :content, null: false
      t.string :description, null: false
      t.string :from
      t.string :seo_keywords
      t.string :seo_description
      t.integer :created_by 
      t.timestamps
    end
  end
end
