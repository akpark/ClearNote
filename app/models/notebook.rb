class Notebook < ActiveRecord::Base
  include PgSearch
  multisearchable :against => [:title]

  validates :title, :author, presence: true
  belongs_to :author, class_name: "User", foreign_key: :author_id, primary_key: :id, dependent: :destroy
  has_many :notes
end
