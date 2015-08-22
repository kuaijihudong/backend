class CreateCasesTypes < ActiveRecord::Migration
  def change
    create_table :cases_types do |t|
      t.string :name
      t.string :description
      t.timestamps
    end
  end
end
