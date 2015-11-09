json.post do
  json.id @post.id
  json.title @post.title
  json.description @json.description
  json.comments []
end
