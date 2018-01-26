class LeadsController < ApplicationController
    before_action :authenticate_user!
    before_action :current_company, only: %i[new create index]
    before_action :current_lead, only: %i[show edit update destroy]

  def index
    @leads = @company.leads
    render json: @leads
  end

  def new
    @lead = @company.leads.build
  end

  def create
    @lead = @company.leads.build(lead_params)
    if @company.save
      redirect_to @company
    else
      render :new
    end
  end

  def show
     @lead = Lead.find(params[:id])
     respond_to do |f|
       f.html {render :show}
       f.json {render json: @lead}
     end
  end

  def edit
  end

  def update
    if @lead.update(lead_params)
      redirect_to company_lead_path(@lead)
    else
      render :edit
    end
  end

  def destroy
    @lead.delete
    redirect_to companies_path
  end

  private

  def lead_params
    params.require(:lead).permit(:name, :contact, :email, :phone_number)
  end

  def current_lead
    @lead = Lead.find_by(id: params[:id])
  end

  def current_company
    @company= Company.find_by(id: params[:company_id])
  end



end
