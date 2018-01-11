# ChatSpace DB設計
- tables
  - users ... ユーザー登録されているユーザーの情報を格納
  - members ... あるチャットグループに参加しているユーザーの情報を格納
    - usersとgroupsの中間テーブル
  - messages ... あるチャットグループに投稿されているコメントの情報を格納
  - groups ... 作成されたチャットグループの情報を格納

---
## users table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|
|mail|string|null: false, unique: true|
|password|string|null: false, unique: true|

### Association
- has_many :groups, through :members
- has_many :members
- has_many :messages

---
## members table
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

---
## messages table
|Column|Type|Options|
|------|----|-------|
|body|text||
|image_url|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

---
## groups table
|Column|Type|Options|
|------|----|-------|
|title|string|null :false|

### Association
- has_many :users, through :members
- has_many :members
- has_many :messages
---

