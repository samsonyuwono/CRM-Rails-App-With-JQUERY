class AddUserIDtoCompanyLeads < ActiveRecord::Migration[5.1]
  def change
    add_column :company_leads, :user_id, :integer
  end
end
