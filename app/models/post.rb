class Post < ActiveRecord::Base
  validates :title, presence: true
  validates :description, presence: true

  belongs_to :user, foreign_key: :user_id
  has_many :comments
end
