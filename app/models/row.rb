class Row < ActiveRecord::Base
  attr_accessible :ord, :section_id,
                  :widget_texts_attributes,
                  :widget_images_attributes

  has_many :row_widget_texts, dependent: :destroy
  has_many :widget_texts, through: :row_widget_texts
  accepts_nested_attributes_for :widget_texts

  has_many :row_widget_images, dependent: :destroy
  has_many :widget_images, through: :row_widget_images
  accepts_nested_attributes_for :widget_images

  def widgets
    @widgets = self.widget_texts +
               self.widget_images
               .sort_by { |hsh| hsh[:ord] }
  end
end
