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
        else {
          absenceUser();
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
});
