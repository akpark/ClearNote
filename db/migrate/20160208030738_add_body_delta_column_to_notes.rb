class AddBodyDeltaColumnToNotes < ActiveRecord::Migration
  def change
    add_column(:notes, :body_delta, :string)
  end
end
