class ChangeColumnInNotes < ActiveRecord::Migration
  def change
    change_column :notes, :body_delta, :text
  end
end
