json.posts(@posts) do |pos|

  json.id pos.id
  json.user_id pos.user_id
  json.borrower_id pos.borrower_id
  json.title pos.title
  json.description pos.description
  json.latitude pos.latitude
  json.longitude pos.longitude
  json.available pos.available

  json.comments(pos.comments) do |comm|
    json.id comm.id
    json.post_id comm.post_id
    json.user_id comm.user_id
    json.description comm.description
  end
end
