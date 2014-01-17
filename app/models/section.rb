class Section < ActiveRecord::Base
  attr_accessible :article_id, :ord, :show_title, :title

  validates :ord, presence: true

  belongs_to :article
end
