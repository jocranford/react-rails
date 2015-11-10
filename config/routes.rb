Rails.application.routes.draw do
  root 'welcome#index'

  namespace :welcome do
    get 'no_animation'
    get 'css_transitions'
    get 'react_motion'
    get 'broken_react_motion'
    get 'staggered_motion'
    get 'motion_springs'
    get 'simple_motion'
  end
end
