json.(@blog, :id, :title, :content, :description, :from, :seo_keywords, :seo_description, :tag)
json.type  Blog::TYPES[@blog.blog_type]
json.banner @blog.get_banner_path
