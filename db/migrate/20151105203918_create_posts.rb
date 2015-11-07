class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.references :user, index: true, foreign_key: true
      t.integer :borrower_id
      t.string :title, null: false
      t.string :description, null: false
      t.string :latitude, null: false
      t.string :longitude, null: false
      t.boolean :available, default: true
      t.integer :point_value, default: 0
      t.string :img

      t.timestamps null: false
    end
  end
end
