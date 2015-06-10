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
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150609141317) do

  create_table "admins", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "user_name",              default: "", null: false
  end

  add_index "admins", ["email"], name: "index_admins_on_email", unique: true, using: :btree
  add_index "admins", ["reset_password_token"], name: "index_admins_on_reset_password_token", unique: true, using: :btree

  create_table "blogs", force: true do |t|
    t.string   "title",                          null: false
    t.string   "tag"
    t.text     "content",                        null: false
    t.string   "description",                    null: false
    t.string   "from"
    t.string   "seo_keywords"
    t.string   "seo_description"
    t.integer  "created_by"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "status",          default: true
    t.integer  "view_count",      default: 0
    t.integer  "blog_type",                      null: false
  end

  create_table "contacts", force: true do |t|
    t.string   "contact_information"
    t.string   "contact_person"
    t.string   "contact_content"
    t.boolean  "is_read"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
