json.(@case, :id, :name, :description, :overview, :url, :client_name, :seo_keywords, :seo_description, :location, :finished_date)
json.type  @case.type_name
json.logo_path @case.get_logo_path
json.images_path @case.get_images_path

json.banner_path @case.get_banner_path
json.case_type_name @case.cases_type.try(:name)
json.case_type_id @case.cases_type.try(:id)
json.tag_name     @case.tag.try(:name)
json.tag_id     @case.tag.try(:id)
json.background_image @case.get_background_image_path
json.homepage_image @case.get_homepage_image_path
json.inner_images 
