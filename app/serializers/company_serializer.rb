class CompanySerializer < ActiveModel::Serializer
  attributes :id, :name, :revenue, :customer
  has_many :leads, through: :company_leads
  has_many :leads
end
