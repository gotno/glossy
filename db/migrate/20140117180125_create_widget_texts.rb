class CreateWidgetTexts < ActiveRecord::Migration
  def change
    create_table :widget_texts do |t|
      t.string :title
      t.boolean :hide_title, default: false
      t.text :body
      t.boolean :hide_body, default: false
      t.integer :ord
      t.string :widget_type, default: "Text"

      t.timestamps
    end

    add_index :widget_texts, :title
  end
end
