json.array! @cases do |c|
  json.(c, :name, :description, :url, :client_name, :seo_keywords, :seo_description, :location)
  json.type  c.type_name
  json.logo_path c.get_logo_path
  json.images_path c.get_images_path
end
