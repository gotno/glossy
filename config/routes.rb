Glossy::Application.routes.draw do
  resources :users, only: [:new, :create, :show] do
    resources :articles, only: [:new, :create, :index]
  end
  resources :articles, only: [:show, :edit, :update]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :articles, except: [:new, :edit]

    resources :sections, only: [:create, :update, :destroy]

    resources :text_widgets, only: [:create, :update, :destroy]
    resources :image_widgets, only: [:create, :update, :destroy]
  end

  root to: 'root#root'
end
