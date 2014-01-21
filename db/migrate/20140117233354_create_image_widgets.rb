class CreateImageWidgets < ActiveRecord::Migration
  def change
    create_table :image_widgets do |t|
      t.string :title
      t.boolean :show_title, default: true
      t.date :date
      t.boolean :show_date, default: true
      t.integer :ord
      t.string :widget_type, default: "Image"

      t.timestamps
    end

    add_index :image_widgets, :title
  end
end
