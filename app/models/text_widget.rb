class TextWidget < ActiveRecord::Base
  attr_accessible :body, :show_body, :show_title, :title
end
