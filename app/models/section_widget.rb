class SectionWidget < ActiveRecord::Base
  attr_accessible :ord, :section_id, :widget_id, :widget_type

  validates :ord, :section_id, :widget_id, :widget_type, presence: true

  belongs_to :section
end
