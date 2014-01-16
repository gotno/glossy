Glossy::Application.routes.draw do
  resources :users, only: [:new, :create, :show] do
    resources :articles, only: [:new, :create, :index]
  end
  resources :articles, only: [:show]
  resource :session, only: [:new, :create, :destroy]

  root to: 'root#root'
end
