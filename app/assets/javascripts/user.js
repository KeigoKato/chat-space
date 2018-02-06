$(document).on("turbolinks:load", function(){   //あまり気にせずに行きたい。
  function appendUser(data){
    var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${data.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${data.id}" data-user-name="${data.name}">追加</a>
              </div>`
    $(".user-search-result").append(html);
  }

  function absenceUser(){
    var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">一致する項目がありません</p>
              </div>`
    $(".user-search-result").append(html);
  }

  function addToGroup(user){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${user.id}'>
                    <p class='chat-group-user__name'>${user.name}</p>
                    <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    $("#chat-group-users").append(html);
  }

  $(".chat-group-form__field").on("keyup", function(){
    var input = $("#user-search-field").val();
    if (input){
      $.ajax({
        url: "/users",
        type: "GET",
        data: { keyword: input },
        dataType: "json",
      })
      .done(function(users){
        $(".user-search-result").empty();
        if (users.length != 0) {
          users.forEach(function(user){
            appendUser(user);
          });
        }
        else { absenceUser();
        }
      })
      .fail(function(){
        alert("検索に失敗しました");
      });
    }
    else {
      $(".user-search-result").empty();
    }
  });
  $(".user-search-result").on("click", ".user-search-add", function(){
    //.user-search-resultのclickアクションが実行された時に、そのclickの発生元が.user-search-addであればfunctionを実行する。
    //バブリングは親要素に対して遡って行く。
    // console.log("done click event");
    $(this).parent().remove();
    var addUser = {"id": $(this).data("user-id"), "name": $(this).data("user-name")};
    addToGroup(addUser);
  });
  $("#chat-group-users").on("click", ".user-search-remove", function(){
    $(this).parent().remove();
  });
});
