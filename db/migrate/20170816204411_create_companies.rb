class CreateCompanies < ActiveRecord::Migration[5.1]
  def change
    create_table :companies do |t|
      t.string :name
      t.integer :revenue
      t.boolean :customer, :default => false
      t.integer :user_id

      t.timestamps
    end
  end
end
