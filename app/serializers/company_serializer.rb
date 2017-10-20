class CompanySerializer < ActiveModel::Serializer
  attributes :id, :name, :revenue, :customer, :user_id
  has_many :leads
end
