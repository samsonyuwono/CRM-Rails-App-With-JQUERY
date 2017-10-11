class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :name
  has_many :comments
end
