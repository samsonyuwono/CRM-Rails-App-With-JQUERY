class Company < ApplicationRecord
  belongs_to :user
  has_many :company_leads
  has_many :leads, through: :company_leads

  validates_uniqueness_of :name, presence: true
  validates :revenue, numericality: { only_integer: true }
  validates :customer, inclusion: { in: [true, false] }


  def leads_attributes=(leads_attributes)
    leads_attributes.values.each do |lead_attribute|
      lead = Lead.find_or_create_by(lead_attribute)
      self.leads << lead
    end
  end




end
