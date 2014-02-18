ActiveRecord::Base.transaction do
  u = User.create!(username: 'demo',
               email: 'demo@glossy.so',
               password: '000000',
               password_confirmation: '000000')

  u.articles.create!
end
