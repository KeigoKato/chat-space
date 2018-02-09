class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
    newMessages = @messages.select{ |newMessage| Time.now < newMessage.created_at+5 }
    @gestMessages = newMessages.reject{ |gestMessage| gestMessage.user_id == current_user.id}
    # あるメッセージが更新された時刻が現在時刻から5秒以内であれば新しいメッセージとみなす。
    # データベースのUTCは正しく働いているから修正は必要ない。
    # @getMessagesによって、current_userが投稿したものは除外する。
    respond_to do |format|
      format.html
      format.json   # user.jsの$.ajaxが読み込まれるとここへ飛ぶ。format.jsonとだけ書かれているので次はjbuilderへ飛ぶ。
    end
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.html{redirect_to group_messages_path(@group)}
        format.json
      end
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
