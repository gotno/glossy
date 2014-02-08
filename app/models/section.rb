class Section < ActiveRecord::Base
  attr_accessible :article_id, :ord, :hide_title, :title,
                  :rows_attributes
#                  :image_widgets_attributes,
#                  :text_widgets_attributes

  validates :ord, presence: true

  has_many :rows, dependent: :destroy
  belongs_to :article
  accepts_nested_attributes_for :rows

#  has_many :section_text_widgets, dependent: :destroy
#  has_many :text_widgets, through: :section_text_widgets
#  accepts_nested_attributes_for :text_widgets
#
#  has_many :section_image_widgets, dependent: :destroy
#  has_many :image_widgets, through: :section_image_widgets
#  accepts_nested_attributes_for :image_widgets
#
#
#  def widgets
#    @widgets = self.text_widgets + 
#               self.image_widgets
#               .sort_by { |hsh| hsh[:ord] }
#  end
end
