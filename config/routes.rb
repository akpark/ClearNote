Rails.application.routes.draw do
  root to: "static_pages#root"

  resources :users
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: {format: :json} do
    resources :notes, only: [:index, :create, :new, :show, :update, :destroy]
    resources :notebooks, only: [:index, :create, :new, :show, :update, :destroy]
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy, :show]
    get "search", to: "utils#search"
  end

  get 'auth/google_oauth2/', to: 'api/sessions#omniauth_google'

end
