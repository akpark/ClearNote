class ChangeNoteColumns < ActiveRecord::Migration
  def change
    remove_column :notes, :title
    remove_column :notes, :body

    add_column :notes, :title, :string
    add_column :notes, :body, :text
  end
end
