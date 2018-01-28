require "rails_helper"

describe MessagesController do
  let(:group) {create(:group)}
  let(:user) {create(:user)}
  # 上記のように書くことで、以下のexample文の中で単にgroupと書けばそれはcreate(:group)を実行していることになる。
  # create(:group)のgroupは、factories/group.rb内で書かれたもの。
  # descrive以下の全てのexample文で使える。全てのexample文でletの値は共通。
  describe "#index" do
    context "log in" do
      before do
        login user    #ログインした状態を作る。ここのloginは/support/controller_macro.rbで定義したlogin(user)のこと
        get :index, params: {group_id: group.id}  #getによって擬似的にindexアクションが呼び出されたからurlに乗っているparamsを取得できる。
      end
      it "assigns @message" do
        expect(assigns(:message)).to be_a_new(Message)
        #すでにgetによってindexアクションが呼び出されている。
        #assigns(:message)は擬似的に呼び出されたindexアクションによって作られたインスタンス変数の@messageであり、コントローラを見ればわかる。
      end
      it "assigns @group" do
        expect(assigns(:group)).to eq group
        #左のgroupは擬似的に呼び出したmessageコントローラの@groupで、右のgroupはletで作ったgroupのこと。
      end
      it "renders index" do
        expect(response).to render_template :index
      end
    end
    context "not log in" do
      before do
        get :index, params: {group_id: group.id}
      end
      it "redirects to new/user_session_path" do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end

  describe "#create" do
    let(:params) {{group_id: group.id, user_id: user.id, message: attributes_for(:message)}}
    # attribute_forはbuildした結果をハッシュにする。
    # attribute_forの引数の:messageはfactoriesディレクトリで作ったmessageのこと
    context "log in" do
      before do
        login user
      end
      context "can save" do
        subject {post :create, params: params}
        #右のparamsはletで作ったparamsのことで、postリクエストによってparamsにlet(:params)を代入して擬似的に送信している。
        it "count up message" do
          expect{subject}.to change(Message, :count).by(1)
          #changeを書くことで、Messageモデルのレコードが増えたかどうかを判定する。
        end
        it "redirects to group_messages_path" do
          subject
          expect(response).to redirect_to(group_messages_path(group))
          binding.pry
          # prefixの引数のgroupはletで作ったもの
        end
      end
      context "can not save" do
        let(:invalid_params) {{group_id: group.id, user_id: user.id, message: attributes_for(:message, content: nil, image: nil)}}
        # contentとimgaeの両方がなければ保存できないというvalidationをかけている。
        subject {post :create, params: invalid_params}
        it "does not couint up" do
          expect{subject}.not_to change(Message, :count)
        end
        it "renders index" do
          subject
          expect(response).to render_template :index
        end
      end
    end
    context "not log in" do
      it "redirects to new_user_session_path" do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end
