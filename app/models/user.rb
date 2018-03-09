class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :omniauthable,
  :recoverable, :rememberable, :trackable, :validatable,
  :omniauthable, :omniauth_providers => [:facebook, :linkedin]

  has_many :companies
  has_many :company_leads
  has_many :leads, through: :company_leads
  has_many :comments


  validates :username, presence: true
  validates :email, presence: true
  validates :password, :presence => true,
                      :confirmation => true,
                      :length => {:within => 6..40},
                      :on => :create


  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
    end
  end

  def customers
    companies.where(customer: true)
  end

  def total_revenue
    total= 0
    companies.each do |company|
      if company.customer == true
        total+= company.revenue
      end
    end
    total
  end

  def total_pipeline
    total= 0
    companies.each do |company|
      total+= company.revenue
    end
    total
  end


  def total_contacts
    counter = []
    companies.each do |company|
      company.leads.each do |lead|
        if lead.contact == true
          counter << lead.contact
        end
      end
    end
    counter.count
  end

  def total_leads
    counter = []
    companies.each do |company|
      company.leads.each do |lead|
        if lead.id > 0
          counter << lead.id
        end
      end
    end
    counter.count
  end


  def total_accounts
    counter = []
    companies.each do |company|
      counter << company
    end
    counter.count
  end

  def next_company(id)
    self.companies.where('id > ?', id).first
  end

end
