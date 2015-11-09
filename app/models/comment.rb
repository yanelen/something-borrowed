class Comment < ActiveRecord::Base
  validates :description, presence: true

  belongs_to :post
  delegate :user, to: :post
end
