class Company < ApplicationRecord
  belongs_to :user
  has_many :company_leads
  has_many :leads, through: :company_leads
  has_many :comments
  accepts_nested_attributes_for :leads

  validates_uniqueness_of :name, presence: true
  validates :revenue, numericality: { only_integer: true }
  validates :customer, inclusion: { in: [true, false] }


end
