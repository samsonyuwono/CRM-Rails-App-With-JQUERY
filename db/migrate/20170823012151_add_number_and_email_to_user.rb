class AddNumberAndEmailToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :leads, :phone_number, :string
    add_column :leads, :email, :string
  end
end
