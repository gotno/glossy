class CreateArticles < ActiveRecord::Migration
  def change
    create_table :articles do |t|
      t.string :title
      t.text :body
      t.boolean :hide_title, default: false
      t.boolean :hide_body, default: false
      t.integer :user_id, null: false
      t.boolean :draft, default: true

      t.timestamps
    end

    add_index :articles, :title
    add_index :articles, :user_id
  end
end
