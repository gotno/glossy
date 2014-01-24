ActiveRecord::Base.transaction do
  u = User.create!(username: 'ont',
               email: 'floyd.will@gmail.com',
               password: '000000',
               password_confirmation: '000000')

  10.times do
    a = u.articles.create!(
      title: Faker::Lorem.sentence(3, false, 3),
      body: Faker::Lorem.paragraphs,
      draft: false
    )

    5.times do |t|
      a.sections.create!(
        title: Faker::Lorem.sentence(5),
        ord: t
      )
    end
  end
#  a = u.articles.create!(title: "article the furst", body: "boddyboddyboddy")
#  a.sections.create!(title: "a section", ord: 0)
#  a.sections.create!(title: "b section", ord: 1)
#  a.sections.create!(title: "ab section", ord: 2)
#
#  a = u.articles.create!(title: "article the wurst", body: "biddybiddybiddy")
#  a.sections.create!(title: "a nuther section", ord: 0)
#  a.sections.create!(title: "a nether section", ord: 1)
#  a.sections.create!(title: "a kether section", ord: 2)
#
#  a = u.articles.create!(title: "article wut burst", body: "buddybuddybuddy")
#  a.sections.create!(title: "arnold sectionopolous", ord: 0)
#  a.sections.create!(title: "steven sectionopolous", ord: 1)
#  a.sections.create!(title: "mortimer sectionopolous", ord: 2)
end
