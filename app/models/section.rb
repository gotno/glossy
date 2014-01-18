class Section < ActiveRecord::Base
  attr_accessible :article_id, :ord, :show_title, :title

  validates :ord, presence: true

  has_many :section_widgets, dependent: :destroy
  belongs_to :article

  WIDGET_TYPES = {
    1 => TextWidget,
    2 => ImageWidget
  }

  def widgets
    return @widgets if @widgets

    @widgets = []

    self.section_widgets.each do |widget|
      type = widget.widget_type
      id   = widget.widget_id

      @widgets << { ord: widget.ord,
                    widget: WIDGET_TYPES[type].find(id) }
    end

    @widgets.sort_by { |hsh| hsh[:ord] }
  end
end
