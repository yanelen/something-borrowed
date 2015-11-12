class Comment < ActiveRecord::Base
  validates :comment, presence: true

  belongs_to :post
  delegate :user, to: :post
end
