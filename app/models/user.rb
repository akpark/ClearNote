class User < ActiveRecord::Base
  attr_reader :password
  validates :username, :password_digest, presence: true
  after_initialize :ensure_session_token!
  validates :password, length: { minimum: 6, allow_nil: true }

  has_many :notes, foreign_key: :author_id, dependent: :destroy
  has_many :notebooks, foreign_key: :author_id, dependent: :destroy

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    user.try(:is_password?, password) ? user : nil
  end

  def self.find_or_create_by_auth_hash(auth_hash)
    provider = auth_hash[:provider]
    uid = auth_hash[:uid]

    user = User.find_by(provider: provider, uid: uid)

    return user if user

    User.create(
      provider: provider,
      uid: uid,
      email: auth_hash[:info][:email],
      fname: auth_hash[:info][:first_name],
      lname: auth_hash[:info][:last_name],
      avatar: auth_hash[:extra][:raw_info][:picture],
      # password: ""
    )
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64(16)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
    self.session_token
  end

  private
  def ensure_session_token!
    self.session_token ||= self.class.generate_session_token
  end

end
