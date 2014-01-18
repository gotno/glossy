class Article < ActiveRecord::Base
  attr_accessible :body, :show_body, :title, :show_title,
                  :user_id, :sections_attributes, :draft

  validates :user_id, presence: true

  belongs_to :user
  has_many :sections, dependent: :destroy

  accepts_nested_attributes_for :sections
end
