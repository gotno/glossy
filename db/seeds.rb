ActiveRecord::Base.transaction do
  u = User.create!(username: 'ont',
               email: 'floyd.will@gmail.com',
               password: '000000',
               password_confirmation: '000000')

#  10.times do
#    a = u.articles.create!(
#      title: Faker::Lorem.sentence(3, false, 3),
#      body: Faker::Lorem.paragraphs,
#      draft: false
#    )
#
#    5.times do |so|
#      s = a.sections.create!(
#        title: Faker::Lorem.sentence(5),
#        ord: so
#      )
#
#      3.times do |ro|
#        r = s.rows.create!(
#          ord: ro
#        )
#
#        2.times do |wo|
#          r.widget_texts.create!(
#            title: "tw#{wo}",
#            ord: wo
#          )
#          r.widget_images.create!(
#            title: "iw#{wo}",
#            ord: wo + 2
#          )
#        end
#      end
#    end
#  end
end
