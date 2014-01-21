class ImageWidget < ActiveRecord::Base
  attr_accessible :date, :show_date,
                  :title, :show_title,
                  :img, :ord, :widget_type

  has_attached_file :img, styles: {
    :big => "1280x1280>", 
    :med => "800x800>", 
    :small => "600x600>", 
    :smallest => "400x400>", 
    :thumb => "200x200>"  
  }
end
