class CreateSectionTextWidgets < ActiveRecord::Migration
  def change
    create_table :section_text_widgets do |t|
      t.integer :section_id, null: false
      t.integer :text_widget_id, null: false

      t.timestamps
    end
  end
end
