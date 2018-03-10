Rails.application.routes.draw do
  devise_for :users, controllers: {registrations: 'user/registrations',
    omniauth_callbacks: 'user/omniauth_callbacks'}

    get 'companies/:id/next', to: 'companies#next'
    get 'companies/:id/previous', to: 'companies#previous'

  resources :companies do
    resources :leads, only: [:index, :new, :create, :show, :edit, :update, :destroy]
  end

  resources :leads
  resources :comments

  root 'static#home', as: 'home'
  get 'customers', to: 'static#customers'
  get 'dashboard', to: 'static#dashboard'

end
