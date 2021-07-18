class RoomsChannel < ApplicationCable::Channel
  def subscribed
    room = Room.friendly.find(params[:room_id])
    reject unless room.player_in_the_room?(current_user)
    stream_for room
  end

  def unsubscribed
  end
end
