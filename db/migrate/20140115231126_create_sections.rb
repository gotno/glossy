class CreateSections < ActiveRecord::Migration
  def change
    create_table :sections do |t|
      t.string :title
      t.boolean :hide_title, default: false
      t.integer :article_id, null: false
      t.integer :ord, null: false

      t.timestamps
    end
    add_index :sections, :title
    add_index :sections, :article_id
  end
end
