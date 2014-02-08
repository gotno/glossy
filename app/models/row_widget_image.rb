class RowWidgetImage < ActiveRecord::Base
  attr_accessible :row_id, :widget_image_id

  validates :section_id, :widget_image_id, presence: true

  belongs_to :row
  belongs_to :widget_image
end
