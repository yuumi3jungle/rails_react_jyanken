class CreateJyankens < ActiveRecord::Migration
  def change
    create_table :jyankens do |t|
      t.integer :human
      t.integer :computer
      t.integer :judgment

      t.timestamps null: false
    end
  end
end
