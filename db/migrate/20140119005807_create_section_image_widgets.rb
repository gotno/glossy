class CreateSectionImageWidgets < ActiveRecord::Migration
  def change
    create_table :section_image_widgets do |t|
      t.integer :section_id, null: false
      t.integer :image_widget_id, null: false

      t.timestamps
    end
  end
end
