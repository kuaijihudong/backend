class Blog < ActiveRecord::Base
  # enum blog_type: [:company_blog, :company_news, :company_notice]

  TYPES = ["公司博客", "公司新闻", "公司公告"]
end
