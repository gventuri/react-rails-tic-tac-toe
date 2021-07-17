class MovesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "moves_channel"
  end

  def unsubscribed
  end
end
