# encoding: utf-8
class Case < ActiveRecord::Base
  validates_presence_of :name, :description, :case_type, :logo,
  :url, :images, :client_name, :location, :seo_keywords, :seo_description
  belongs_to :cases_type
  belongs_to :tag
  has_many :attachments
  TYPES = ["行业网站建设", "品牌创意设计", "移动终端", "软件开发"]
  include Paperclip::Glue


  # scope :inner_images, ->(user_id){where(".id = ?", user_id)}

  has_attached_file :logo#, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  validates_attachment_content_type :logo, :content_type => /\Aimage\/.*\Z/
  has_attached_file :images#, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  validates_attachment_content_type :images, :content_type => /\Aimage\/.*\Z/
  has_attached_file :banner#, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  validates_attachment_content_type :banner, :content_type => /\Aimage\/.*\Z/
  has_attached_file :background_image#, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  validates_attachment_content_type :background_image, :content_type => /\Aimage\/.*\Z/
  has_attached_file :homepage_image#, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  validates_attachment_content_type :homepage_image, :content_type => /\Aimage\/.*\Z/

  def get_path
    path = "00#{self.id}"
    path = path[path.length - 3 , path.length]
    return path
  end
  def get_logo_path
    if self.logo_file_name
      "/system/cases/logos/000/000/#{get_path}/original/#{self.logo_file_name}"
    else
      ""
    end
  end

  def get_images_path
    if self.images_file_name
      "/system/cases/images/000/000/#{get_path}/original/#{self.images_file_name}"
    else
      ""
    end
  end

  def get_banner_path
    if self.banner_file_name
      "/system/cases/images/000/000/#{get_path}/original/#{self.banner_file_name}"
    else
      ""
    end
  end

  def get_background_image_path
    if self.background_image_file_name
      "/system/cases/images/000/000/#{get_path}/original/#{self.background_image_file_name}"
    else
      ""
    end
  end

  def get_homepage_image_path
    if self.homepage_image_file_name
      "/system/cases/images/000/000/#{get_path}/original/#{self.homepage_image_file_name}"
    else
      ""
    end
  end

  def type_name
    TYPES[self.case_type]
  end


  def inner_images
    self.attachments.where(attachment_type: 0)
  end
  def out_images
    self.attachments.where(attachment_type: 1)
  end
end
