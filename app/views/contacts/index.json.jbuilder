json.array! @contacts do |c|
  json.(c, :contact_information, :contact_person)
end
