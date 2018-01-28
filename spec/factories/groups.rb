FactoryGirl.define do
  factory :group do             # :groupを呼び立したときのあらかじめのカラム値を定義しておく。
    name Faker::Team.name       #Faker::Team.nameに関してはGithubを参照。呼び出すたびにランダムの値をnameカラムに代入する。
  end
end
