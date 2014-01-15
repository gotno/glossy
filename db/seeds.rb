ActiveRecord::Base.transaction do
  User.create!(username: 'ont',
               email: 'floyd.will@gmail.com',
               password: '000000',
               password_confirmation: '000000')
end
