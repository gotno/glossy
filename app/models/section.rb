class Section < ActiveRecord::Base
  attr_accessible :article_id, :ord, :show_title, :title

  validates :articles_id, presence: true

  belongs_to :article
end
