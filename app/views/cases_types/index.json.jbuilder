json.array! @cases_types do |c|
  json.(c, :id, :name, :description)
end
