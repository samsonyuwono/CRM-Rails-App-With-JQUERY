class CompaniesController < ApplicationController
before_action :authenticate_user!
before_action :current_company, only: %i[show edit update destroy]

 def index
  @companies = current_user.companies
    respond_to do |f|
      f.html {render :index}
      f.json{render json: @companies}
    end
 end

 def new
  @company= Company.new
 end

 def create
   @company = User.find(current_user.id).companies.build(company_params)
   if @company.save
     redirect_to company_path(@company)
   else
     render :new
   end
 end

 def show
   @comment = Comment.new
   respond_to do |f|
     f.html {render :show}
     f.json{render json: @company}
   end
 end

 def edit
 end

 def update
  if @company.update(company_params)
    redirect_to company_path(@company)
  else
    render :edit
  end
 end

 def destroy
    @company.delete
    redirect_to companies_path
  end

  def next
    company = current_user.next_company(params[:id])
    render json: company
  end

 private

 def company_params
   params.require(:company).permit(:name, :revenue, :customer, :user_id,
   leads_attributes: [:name, :contact, :phone_number, :email])
 end

 def current_company
   @company = Company.find_by(id: params[:id])
 end

end
