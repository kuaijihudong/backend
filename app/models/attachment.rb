class Attachment < ActiveRecord::Base
  include Paperclip::Glue
  has_attached_file :image#, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/
  belongs_to :case


  def get_image_path
    if self.images_file_name
      path = "00#{self.id}"
      path = path[path.length - 3 , path.length]
      "/system/attachments/images/000/000/#{path}/original/#{self.image_file_name}"
    else
      ""
    end
  end
end
