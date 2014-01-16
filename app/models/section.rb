class Section < ActiveRecord::Base
  attr_accessible :article_id, :ord, :show_title, :title

  validates :article_id, :ord, presence: true

  belongs_to :article
end
