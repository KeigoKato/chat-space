json.name @message.user.name
json.created_time @message.created_at.in_time_zone("Tokyo").to_s
json.message @message.content
json.image  @message.image.to_s

