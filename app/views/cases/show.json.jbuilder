json.(@case, :id, :name, :description, :url, :client_name, :seo_keywords, :seo_description, :location, :finished_date)
json.type  @case.type_name
json.logo_path @case.get_logo_path
json.images_path @case.get_images_path

json.banner_path @case.get_banner_path
json.case_type_name @case.cases_type.try(:name)
json.case_type_id @case.cases_type.try(:id)
json.tag_name     @case.tag.try(:name)
json.tag_id     @case.tag.try(:id)
