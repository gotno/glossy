class SectionTextWidget < ActiveRecord::Base
  attr_accessible :section_id, :text_widget_id

  validates :section_id, :text_widget_id, presence: true

  belongs_to :section
  belongs_to :text_widget
end
