class RowWidgetText < ActiveRecord::Base
  attr_accessible :row_id, :widget_text_id

  validates :row_id, :widget_text_id, presence: true

  belongs_to :row
  belongs_to :widget_text
end
