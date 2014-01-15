class User < ActiveRecord::Base
  attr_accessible :email, :password, :password_confirmation, :username
  attr_reader :password

  validates :email, :username, uniqueness: { case_sensitive: false }
  validates :email, :username, presence: true
  validates :username, length: { maximum: 20 }
  validates :password, length: { minimum: 6 }, confirmation: true, on: :create

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, format: { with: VALID_EMAIL_REGEX }

  before_validation :reset_session_token

  def password=(pw)
    @password = pw
    self.password_digest = BCrypt::Password.create(pw)
  end

  def is_password?(pw)
    BCrypt::Password.new(self.password_digest).is_password?(pw)
  end

  def reset_session_token
    self.session_token = User.generate_token
  end

  def reset_session_token!
    self.reset_session_token
    self.save!
  end

  def self.find_by_credentials(creds)
    user = User.find_by_username(creds[:username])
    return user if user && user.is_password?(creds[:password])
    nil
  end

  def self.generate_token
    SecureRandom::urlsafe_base64(16)
  end
end
