class CompanyLeadSerializer < ActiveModel::Serializer
  attributes :id, :company_id, :lead_id
  belongs_to :company
  belongs_to :lead
  belongs_to :user
end
