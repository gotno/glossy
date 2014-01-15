class CreateArticles < ActiveRecord::Migration
  def change
    create_table :articles do |t|
      t.string :title
      t.string :body
      t.boolean :show_title, default: false
      t.boolean :show_body, default: false
      t.integer :user_id, null: false

      t.timestamps
    end

    add_index :articles, :title
    add_index :articles, :user_id
  end
end
