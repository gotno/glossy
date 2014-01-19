class Section < ActiveRecord::Base
  attr_accessible :article_id, :ord, :show_title, :title,
                  :images_widgets_attributes,
                  :text_widgets_attributes

  validates :ord, presence: true

  has_many :section_text_widgets, dependent: :destroy
  has_many :text_widgets, through: :section_text_widgets
  accepts_nested_attributes_for :text_widgets

  has_many :section_image_widgets, dependent: :destroy
  has_many :image_widgets, through: :section_image_widgets
  accepts_nested_attributes_for :image_widgets

  belongs_to :article

#  WIDGET_TYPES = {
#    1 => TextWidget,
#    2 => ImageWidget
#  }

  def widgets
#    return @widgets if @widgets
#
#    @widgets = []
#
#    self.section_widgets.each do |widget|
#      type = widget.widget_type
#      id   = widget.widget_id
#
#      @widgets << { ord: widget.ord,
#                    widget: WIDGET_TYPES[type].find(id) }
#    end
#
#    @widgets.sort_by { |hsh| hsh[:ord] }
    self.text_widgets
      .concat(self.image_widgets)
      .sort_by { |hsh| hsh[:ord] }
  end
end
