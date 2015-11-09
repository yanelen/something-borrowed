json.post_id @comment.post_id

json.comment do
  json.id @comment.id
  json.description @comment.description
end
