class SectionImageWidget < ActiveRecord::Base
  attr_accessible :section_id, :image_widget_id

  validates :section_id, :image_widget_id, presence: true

  belongs_to :section
  belongs_to :image_widget
end
