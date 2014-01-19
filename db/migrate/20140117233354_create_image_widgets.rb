class CreateImageWidgets < ActiveRecord::Migration
  def change
    create_table :image_widgets do |t|
      t.string :title
      t.date :date
      t.integer :ord

      t.timestamps
    end

    add_index :image_widgets, :title
  end
end
