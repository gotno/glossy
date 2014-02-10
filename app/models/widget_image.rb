class WidgetImage < ActiveRecord::Base
  attr_accessible :date, :hide_date,
                  :title, :hide_title,
                  :img, :ord, :widget_type

  has_attached_file :img, styles: {
    :big => "1170x1170>", 
    :med => "970x970>", 
    :small => "750x750>", 
    :smallest => "480x480>", 
    :thumb => "150x150>"  
  }
end
