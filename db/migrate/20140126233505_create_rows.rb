class CreateRows < ActiveRecord::Migration
  def change
    create_table :rows do |t|
      t.integer :section_id, null: false
      t.integer :ord, null: false

      t.timestamps
    end
  end
end
