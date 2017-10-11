class CompanyLead < ApplicationRecord

  belongs_to :company
  belongs_to :lead
  belongs_to :user 
end
