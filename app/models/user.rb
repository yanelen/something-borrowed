class User < ActiveRecord::Base
  has_secure_password

  validates :username, presence: true
  validates :password_digest, presence: true
  validates :email, presence: true

  validates :password, length: {
    minimum: 6, allow_nil: true
  }
end
