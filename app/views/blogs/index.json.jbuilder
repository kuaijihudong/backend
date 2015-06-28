json.array! @blogs do |blog|
  json.(blog, :id, :title, :content, :description, :from, :seo_keywords, :seo_description, :tag, :created_by)
  json.type  Blog::TYPES[blog.blog_type]
  json.banner blog.get_banner_path
end
