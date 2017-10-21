class CommentSerializer < ActiveModel::Serializer
  attributes :id, :text, :company_id
  belongs_to :company
  
end
