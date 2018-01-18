class GroupUser < ApplicationRecord
  belongs_to :group
  brlongs_to :user
end
