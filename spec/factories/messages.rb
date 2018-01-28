FactoryGirl.define do
  factory :message do
    content Faker::Lorem.sentence
    image File.open("#{Rails.root}/public/images/no_image.jpg")   #Rails.rootは今扱っているアプリケーションのパスを表す。
    user
    group
  end
end
