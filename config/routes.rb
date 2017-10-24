Rails.application.routes.draw do
  get 'companies/:id/next', to: 'companies#next'


  devise_for :users, controllers: {registrations: 'user/registrations',
    omniauth_callbacks: 'user/omniauth_callbacks'}

  resources :companies do
    resources :leads, only: [:new, :create, :show, :edit, :update, :destroy]
  end

  resources :leads

  resources :comments



  root 'static#home', as: 'home'
  get 'customers', to: 'static#customers'
  get 'dashboard', to: 'static#dashboard'

end
