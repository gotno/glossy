json.(article, :id, :title, :show_title, :body, :show_body)
json.sections(article.sections) do |section|
  json.(section, :id, :title, :show_title, :ord)

  json.rows(section.rows) do |row|
    wt = row.widget_texts
    if (wt.count > 0)
      json.widget_texts(wt) do |widget|
        json.(widget, :id, :ord, :widget_type,
                      :title, :show_title,
                      :body,  :show_body,)
      end
    end

    wi = row.widget_images
    if (wi.count > 0)
      json.widget_images(wi) do |widget|
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
end
