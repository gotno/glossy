json.(@article, :id, :title, :show_title, :body, :show_body)
json.sections(@article.sections, :id, :title, :show_title, :ord)
