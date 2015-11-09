json.user current_user.username

json.posts(@posts) do |pos|

  json.id pos.id
  json.title pos.title
  json.description pos.description

  json.comments(pos.comments) do |comm|
    json.id comm.id
    json.description comm.description
  end
end
