class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.references :user, index: true, foreign_key: true
      t.int :borrower_id
      t.string :title, null: false
      t.string :description, null: false
      t.array :location, null: false
      t.boolean :available, default: true
      t.int :point_value, default: 0
      t.string :img

      t.timestamps null: false
    end
  end
end
