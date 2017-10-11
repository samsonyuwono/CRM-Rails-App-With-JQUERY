class AddContactToLeads < ActiveRecord::Migration[5.1]
  def change
    add_column :leads, :contact, :boolean, :default => false
  end
end
