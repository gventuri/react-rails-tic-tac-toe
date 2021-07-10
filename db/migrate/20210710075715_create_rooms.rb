class CreateRooms < ActiveRecord::Migration[6.1]
  def change
    create_table :rooms do |t|
      t.string :slug, null: false
      t.string :inviter_code, null: false
      t.string :challenger_code
      t.boolean :inviter_starts, null: false

      t.timestamps
    end
  end
end
