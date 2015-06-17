class CreateCases < ActiveRecord::Migration
  def change
    create_table :cases do |t|
      t.string :name, null: false
      t.string :description, null: false
      t.integer :case_type, null: false
      # t.string :logo_path, null: false
      t.string :url, null: false
      # t.string :images, null: false
      t.string :client_name, null: false
      t.string :location, null: false
      t.string :seo_keywords, null: false
      t.string :seo_description, null: false
      t.string :status
      t.timestamps
    end
  end
end
