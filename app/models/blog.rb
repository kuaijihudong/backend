# encoding: utf-8
class Blog < ActiveRecord::Base
  # enum blog_type: [:company_blog, :company_news, :company_notice]
  validates_presence_of :title, :content, :blog_type, :description
  has_attached_file :banner#, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  validates_attachment_content_type :banner, :content_type => /\Aimage\/.*\Z/
  TYPES = ["公司博客", "公司新闻", "公司公告"]

  def get_banner_path
    if self.banner_file_name
      "/system/blogs/banners/000/000/00#{self.id}/original/#{self.banner_file_name}"
    else
      ""
    end
  end
end
