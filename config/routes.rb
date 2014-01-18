Glossy::Application.routes.draw do
  resources :users, only: [:new, :create, :show] do
    resources :articles, only: [:new, :create, :index]
  end
  resources :articles, only: [:show, :edit, :update]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :articles, except: [:new, :edit] do
      resources :sections, only: [:create]
    end

    #resources :sections, except: [:create]
    #resources :section_widgets
    #resources :text_widgets
  end

  root to: 'root#root'
end
