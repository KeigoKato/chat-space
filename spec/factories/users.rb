FactoryGirl.define do
  factory :user do        #usersコントローラのテストにしようする。以下のFakerの意味はGithubを参照すること。
    password = Faker::Internet.password(8)    # = でつながれているので、password変数に値を代入している。
    name Faker::Name.last_name
    email Faker::Internet.free_email
    password password     #右辺のpasswordは上で定義したpassword変数。
    password_confirmation password    #password_confirmationはpasswordと同いになるのだから、こうなる。
  end
end
