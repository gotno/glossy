class Section < ActiveRecord::Base
  attr_accessible :article_id, :ord, :hide_title, :title,
                  :rows_attributes

  validates :ord, presence: true

  has_many :rows, dependent: :destroy
  belongs_to :article
  accepts_nested_attributes_for :rows
end
