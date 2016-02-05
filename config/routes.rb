Rails.application.routes.draw do
  root to: "static_pages#root"

  resources :users
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: {format: :json} do
    resources :notes, only: [:index, :create, :new, :show, :update, :destroy]
    resources :notebooks, only: [:index, :create, :new, :show, :update, :destroy]
    resource :session, only: [:create, :destroy, :show]
    get "search", to: "utils#search"
  end

end
