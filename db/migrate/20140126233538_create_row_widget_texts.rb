class CreateRowWidgetTexts < ActiveRecord::Migration
  def change
    create_table :row_widget_texts do |t|
      t.integer :row_id
      t.integer :widget_text_id

      t.timestamps
    end
  end
end
