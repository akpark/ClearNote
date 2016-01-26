Rails.application.routes.draw do
  root "static_pages#root"
  
  resources :users, only: [:new, :create, :destroy]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: {format: :json} do
    resources :notes, only: [:index]
  end
end
