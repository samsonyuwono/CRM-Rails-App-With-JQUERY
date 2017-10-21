class CommentSerializer < ActiveModel::Serializer
  attributes :id, :user, :company, :text
  belongs_to :company
  belongs_to :user
end
