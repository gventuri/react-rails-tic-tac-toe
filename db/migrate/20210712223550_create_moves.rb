class CreateMoves < ActiveRecord::Migration[6.1]
  def change
    create_table :moves do |t|
      t.integer :cell_id, null: false
      t.string :player_code, null: false
      t.references :room, index: true
      t.index [:player_code, :cell_id, :room_id], unique: true

      t.timestamps
    end
  end
end
