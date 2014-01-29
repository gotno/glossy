class CreateRows < ActiveRecord::Migration
  def change
    create_table :rows do |t|
      t.integer :section_id
      t.integer :ord

      t.timestamps
    end
  end
end
