class CreateNotebooks < ActiveRecord::Migration
  def change
    create_table :notebooks do |t|
      t.string :title, null: false
      t.integer :author_id, null: false
      t.boolean :shortcut, default: false

      t.timestamps
    end
    add_index :notebooks, :author_id
  end
end
