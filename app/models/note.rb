class Note < ActiveRecord::Base
  validates :title, :body, :author, :notebook_id, presence: true
  belongs_to :author, class_name: "User", foreign_key: :author_id, primary_key: :id
end
