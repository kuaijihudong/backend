class Contact < ActiveRecord::Base
  validates_presence_of :contact_person, :contact_information, :contact_content
end
