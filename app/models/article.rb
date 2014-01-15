class Article < ActiveRecord::Base
  attr_accessible :body, :show_body, :title, :show_title, :user_id

  validates :user_id, presence: true

  belongs_to :user
  has_many :sections
end
