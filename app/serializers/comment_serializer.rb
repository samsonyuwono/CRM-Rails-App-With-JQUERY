class CommentSerializer < ActiveModel::Serializer
  attributes :id, :text, :company, :user
  belongs_to :company
  belongs_to :user
end
