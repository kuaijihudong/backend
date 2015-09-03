class CreateAttachments < ActiveRecord::Migration
  def change
    create_table :attachments do |t|
      t.integer :case_id, null: false
      t.integer :attachment_type, null: false
      t.timestamps
    end
  end
end
