class Note < ActiveRecord::Base
  # :if => labmda { |author| author == current_user }
  validates :title, :body, :body_delta, :author, :notebook_id, presence: true
  belongs_to :author, class_name: "User", foreign_key: :author_id, primary_key: :id, dependent: :destroy
  belongs_to :notebook, dependent: :destroy

  include PgSearch
  multisearchable :against => [:title],
  using: {tsearch: {prefix: true, dictionary: "english"}}
end
