class CreateContacts < ActiveRecord::Migration
  def change
    create_table :contacts do |t|
      t.string :contact_information
      t.string :contact_person
      t.string :contact_content
      t.boolean :is_read
      t.timestamps
    end
  end
end
