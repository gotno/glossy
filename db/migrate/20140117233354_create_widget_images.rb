class CreateWidgetImages < ActiveRecord::Migration
  def change
    create_table :widget_images do |t|
      t.string :title
      t.boolean :hide_title, default: false
      t.date :date
      t.boolean :hide_date, default: false
      t.integer :ord
      t.string :widget_type, default: "Image"

      t.timestamps
    end

    add_index :widget_images, :title
  end
end
