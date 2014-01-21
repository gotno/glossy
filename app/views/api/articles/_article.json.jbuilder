json.(article, :id, :title, :show_title, :body, :show_body)
json.sections(article.sections) do |section|
  json.(section, :id, :title, :show_title, :ord)

  tw = section.text_widgets
  if (tw.count > 0)
    json.text_widgets(tw) do |widget|
      json.(widget, :id, :ord, :widget_type,
                    :title, :show_title,
                    :body,  :show_body,)
    end
  end

  iw = section.image_widgets
  if (iw.count > 0)
    json.image_widgets(iw) do |widget|
      json.(widget, :id, :ord, :widget_type, 
                    :title, :show_title,
                    :date,  :show_date)
      json.image_url_original widget.img.url 
      json.image_url_big      widget.img.url(:big)
      json.image_url_med      widget.img.url(:med)
      json.image_url_small    widget.img.url(:small)
      json.image_url_smallest widget.img.url(:smallest)
      json.image_url_thumb    widget.img.url(:thumb) 
    end
  end
end
