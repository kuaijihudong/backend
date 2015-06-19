json.array! @blogs do |blog|
  json.(blog, :title, :content, :description, :from, :seo_keywords, :seo_description, :tag)
  json.type  Blog::TYPES[blog.blog_type]
end
