Rails.application.routes.draw do
  root to: "static_pages#root"

  resources :users, only: [:new, :create, :destroy]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: {format: :json} do
    resources :notes, only: [:index, :create, :new, :show, :update, :destroy]
    resources :notebooks, only: [:index, :create, :new, :show, :update, :destroy]
  end

end
