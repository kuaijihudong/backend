json.array! @cases do |c|
  json.(c, :id, :name, :description, :url, :client_name, :seo_keywords, :seo_description, :location, :finished_date)
  json.type  c.type_name
  json.logo_path c.get_logo_path
  json.images_path c.get_images_path
  json.banner_path c.get_banner_path
  json.case_type_name c.cases_type.try(:name)
  json.case_type_id c.cases_type.try(:id)
  json.tag_name     c.tag.try(:name)
  json.tag_id     c.tag.try(:id)
end
