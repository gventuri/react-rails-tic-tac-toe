Rails.application.routes.draw do
  root 'homepage#index'

  resources :rooms, only: [:show, :create]
end
