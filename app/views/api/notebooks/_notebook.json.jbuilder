json.extract! notebook, :id, :title
json.notes do
  json.extract! notebook, :notes
end
