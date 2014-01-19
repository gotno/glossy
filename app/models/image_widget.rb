class ImageWidget < ActiveRecord::Base
  attr_accessible :date, :title, :img

  has_attached_file :img, styles: {
    :big => "600x600>", # (> = scale)
    :small => "50x50#"  # (# = scale then crop)
  }
end
