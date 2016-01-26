class CreateNotes < ActiveRecord::Migration
  def change
    create_table :notes do |t|
      t.string :title, null: false
      t.text :body, null: false
      t.integer :author_id, null: false
      t.integer :notebook_id, null: false
      t.boolean :shortcut, default: false
      t.boolean :archived, default: false
    end
  end
end
