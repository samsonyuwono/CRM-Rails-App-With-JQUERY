class LeadSerializer < ActiveModel::Serializer
  attributes :id, :name, :contact, :email, :phone_number
  belongs_to :company, serializer: CompanyLeadSerializer
end
