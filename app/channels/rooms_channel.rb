class RoomsChannel < ApplicationCable::Channel
  def subscribed
    room = Room.friendly.find(params[:room_id])
    stream_for room
  end

  def unsubscribed
  end
end
