class WidgetImage < ActiveRecord::Base
  attr_accessible :date, :hide_date,
                  :title, :hide_title,
                  :img, :ord, :widget_type

  has_attached_file :img, styles: {
    :big => "960x960>", 
    :med => "480x480>", 
    :small => "320x320>", 
    :smallest => "240x240>", 
    :thumb => "150x150>"  
  }
end
