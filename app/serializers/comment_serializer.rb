class CommentSerializer < ActiveModel::Serializer
  attributes :id, :text, :company
  belongs_to :company
  # belongs_to :user
end
