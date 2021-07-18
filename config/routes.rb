Rails.application.routes.draw do
  root 'homepage#index'

  resources :rooms, only: [:show, :create] do
    resources :moves, only: [:index, :create]

    post 'join'
    put 'rematch'
  end

  mount ActionCable.server => '/cable'
end
