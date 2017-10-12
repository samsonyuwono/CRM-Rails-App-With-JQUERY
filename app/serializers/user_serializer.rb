class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :name
  has_many :companies
  has_many :leads, through: :company_leads
end
