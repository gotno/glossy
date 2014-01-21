class CreateTextWidgets < ActiveRecord::Migration
  def change
    create_table :text_widgets do |t|
      t.string :title
      t.boolean :show_title, default: true
      t.text :body
      t.boolean :show_body, default: true
      t.integer :ord
      t.string :widget_type, default: "Text"

      t.timestamps
    end

    add_index :text_widgets, :title
  end
end
