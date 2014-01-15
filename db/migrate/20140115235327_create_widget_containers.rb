class CreateWidgetContainers < ActiveRecord::Migration
  def change
    create_table :widget_containers do |t|
      t.integer :section_id, null: false
      t.integer :ord, null: false
      t.integer :widget_id, null: false
      t.integer :widget_type, null: false

      t.timestamps
    end

    add_index :widget_containers, :section_id
    add_index :widget_containers, :widget_id
  end
end
