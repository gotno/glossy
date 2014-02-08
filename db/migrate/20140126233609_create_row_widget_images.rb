class CreateRowWidgetImages < ActiveRecord::Migration
  def change
    create_table :row_widget_images do |t|
      t.integer :row_id
      t.integer :widget_image_id

      t.timestamps
    end
  end
end
