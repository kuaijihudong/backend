json.array! @tags do |c|
  json.(c, :id, :name, :description)
end
