json.post_id @comment.post_id

json.comment do
  json.id @comment.id
  json.user_id @comment.user_id
  json.comment @comment.comment
  json.created_at @comment.created_at
end
