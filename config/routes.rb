Rails.application.routes.draw do
  root to: "static_pages#root"

  resources :users

  namespace :api, defaults: {format: :json} do
    resources :notes, only: [:index, :create, :new, :show, :update, :destroy]
    resources :notebooks, only: [:index, :create, :new, :show, :update, :destroy]
    resource :session, only: [:new, :create, :destroy]
  end

end
