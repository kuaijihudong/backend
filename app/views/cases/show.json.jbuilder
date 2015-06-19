json.(@case, :name, :description, :url, :client_name, :seo_keywords, :seo_description, :location)
json.type  @case.type_name
json.logo_path @case.get_logo_path
json.images_path @case.get_images_path
