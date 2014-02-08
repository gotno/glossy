class WidgetText < ActiveRecord::Base
  attr_accessible :body, :hide_body, :hide_title, :title, :ord, :widget_type

  validates :ord, presence: true
end
