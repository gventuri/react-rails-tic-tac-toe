module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    protected
      def find_verified_user
        player_code = cookies[:player_code]
        if player_code.present?
          player_code
        else
          reject_unauthorized_connection
        end
      end
  end
end
