class ImageWidget < ActiveRecord::Base
  attr_accessible :date, :show_date,
                  :title, :show_title,
                  :img, :ord, :widget_type

  has_attached_file :img, styles: {
    :big => "1024x1024>", 
    :med => "960x960>", 
    :small => "720x720>", 
    :smallest => "480x480>", 
    :thumb => "150x150>"  
  }
end
