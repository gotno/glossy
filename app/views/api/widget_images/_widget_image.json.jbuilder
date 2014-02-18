json.(widget_image, :id, :ord, :widget_type, 
                    :title, :hide_title,
                    :date,  :hide_date)
json.image_url_big      widget_image.img.url(:big)
json.image_url_med      widget_image.img.url(:med)
json.image_url_small    widget_image.img.url(:small)
json.image_url_smallest widget_image.img.url(:smallest)
json.image_url_thumb    widget_image.img.url(:thumb) 
