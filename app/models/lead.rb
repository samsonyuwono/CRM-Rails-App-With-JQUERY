class Lead < ApplicationRecord
  belongs_to :company, optional: true
  has_many :company_leads
  has_many :companies, through: :company_leads


  validates :name, presence: true
  validates :email, presence: true
  validates :phone_number, length: {is: 8}, allow_blank: false
  validates :contact, inclusion: { in: [true, false] }

end
