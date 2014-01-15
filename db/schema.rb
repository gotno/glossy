# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20140115235327) do

  create_table "articles", :force => true do |t|
    t.string   "title"
    t.string   "body"
    t.boolean  "show_title", :default => false
    t.boolean  "show_body",  :default => false
    t.integer  "user_id",                       :null => false
    t.datetime "created_at",                    :null => false
    t.datetime "updated_at",                    :null => false
  end

  add_index "articles", ["title"], :name => "index_articles_on_title"
  add_index "articles", ["user_id"], :name => "index_articles_on_user_id"

  create_table "sections", :force => true do |t|
    t.string   "title"
    t.boolean  "show_title", :default => false
    t.integer  "article_id",                    :null => false
    t.integer  "ord"
    t.datetime "created_at",                    :null => false
    t.datetime "updated_at",                    :null => false
  end

  add_index "sections", ["article_id"], :name => "index_sections_on_article_id"
  add_index "sections", ["title"], :name => "index_sections_on_title"

  create_table "users", :force => true do |t|
    t.string   "username",        :null => false
    t.string   "email",           :null => false
    t.string   "password_digest", :null => false
    t.string   "session_token",   :null => false
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["session_token"], :name => "index_users_on_session_token"
  add_index "users", ["username"], :name => "index_users_on_username", :unique => true

  create_table "widget_containers", :force => true do |t|
    t.integer  "section_id",  :null => false
    t.integer  "ord",         :null => false
    t.integer  "widget_id",   :null => false
    t.integer  "widget_type", :null => false
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  add_index "widget_containers", ["section_id"], :name => "index_widget_containers_on_section_id"
  add_index "widget_containers", ["widget_id"], :name => "index_widget_containers_on_widget_id"

end
