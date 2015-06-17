# encoding: utf-8
class Blog < ActiveRecord::Base
  # enum blog_type: [:company_blog, :company_news, :company_notice]
  validates_presence_of :title, :content, :blog_type, :description
  TYPES = ["公司博客", "公司新闻", "公司公告"]
end
