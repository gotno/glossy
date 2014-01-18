class CreateSectionWidgets < ActiveRecord::Migration
  def change
    create_table :section_widgets do |t|
      t.integer :section_id, null: false
      t.integer :ord, null: false
      t.integer :widget_id, null: false
      t.integer :widget_type, null: false

      t.timestamps
    end

    add_index :section_widgets, :section_id
    add_index :section_widgets, :widget_id
  end
end
