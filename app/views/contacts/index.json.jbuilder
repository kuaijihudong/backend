json.array! @contacts do |c|
  json.(c, :id, :contact_information, :contact_person, :contact_content, :created_by)
end
