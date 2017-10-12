class CompanyLeadSerializer < ActiveModel::Serializer
  attributes :id
  belongs_to :company
  belongs_to :lead
  belongs_to :user
end
