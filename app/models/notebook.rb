class Notebook < ActiveRecord::Base
  validates :title, :author, presence: true
  belongs_to :author
  has_many :notes
end
