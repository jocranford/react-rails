Rails.application.routes.draw do
  root 'welcome#index'

  namespace :welcome do
    get 'no_animation'
    get 'css_transitions'
    get 'react_motion'
    get 'motion_and_staggered_motion'
  end
end
