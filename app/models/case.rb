# encoding: utf-8
class Case < ActiveRecord::Base
  validates_presence_of :name, :description, :case_type, :logo,
  :url, :images, :client_name, :location, :seo_keywords, :seo_description
  TYPES = ["行业网站建设", "品牌创意设计", "移动终端", "软件开发"]
  include Paperclip::Glue

  has_attached_file :logo#, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  validates_attachment_content_type :logo, :content_type => /\Aimage\/.*\Z/
  has_attached_file :images#, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  validates_attachment_content_type :images, :content_type => /\Aimage\/.*\Z/
end
