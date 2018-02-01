class CreateCompanyLeads < ActiveRecord::Migration[5.1]
  def change
    create_table :company_leads do |t|
      t.integer :company_id
      t.integer :lead_id

      t.timestamps
    end
  end
end
