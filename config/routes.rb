Glossy::Application.routes.draw do
  resources :users, only: [:new, :create, :show] do
    resources :articles, only: [:new, :create, :index]
  end
  resources :articles, only: [:show, :edit, :update]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :articles, except: [:new, :edit]
    resources :sections, only: [:create, :update, :destroy]
    resources :rows, only: [:create, :update, :destroy]
    resources :widget_texts, only: [:create, :update, :destroy]
    resources :widget_images, only: [:create, :update, :destroy]
  end

  get '/:id', to: 'users#show'
  root to: 'root#root'
end
