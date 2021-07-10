class AddUniquenessToRoomsSlug < ActiveRecord::Migration[6.1]
  def change
    add_index :rooms, :slug, unique: true
  end
end
