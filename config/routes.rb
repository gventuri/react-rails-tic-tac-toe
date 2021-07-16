Rails.application.routes.draw do
  root 'homepage#index'

  resources :rooms, only: [:show, :create] do
    resources :moves, only: [:index, :create]
  end
end
