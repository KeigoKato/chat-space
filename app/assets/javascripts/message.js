$(function() {

  function buildHTML(data) {
    if (data.image != "undefined") {
      var imageHTML =`
                  <div class="wrapper__right__messages__message__lower-image">
                    <img src="${data.image}">
                  </div>
                  `
    }
    var html =`
              <div class="wrapper__right__messages__message">
                <ul class="wrapper__right__messages__message__upper">
                  <li class="wrapper__right__messages__message__upper__name">
                    ${data.name}
                  </li>
                  <li class="wrapper__right__messages__message__upper__date">
                    ${data.created_time}
                  </li>
                </ul>
                <div class="wrapper__right__messages__message__lower-message">
                  ${data.message}
                </div>
                ${imageHTML}
              </div>
              `
    return html;
  }

  $("#new_message").on("submit", function(e) {  //イベントはsubmitボタンではなくformにかける。formのidまたはクラスを参照すること。
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $(".wrapper__right__messages").append(html);
      $(".wrapper__right__footer__left__text").val("");
      $(".wrapper__right__footer__left__image__hidden").val("");
      $(".wrapper__right__footer__right").prop("disabled", false);
      $('.wrapper__right__messages').animate({scrollTop: $('.wrapper__right__messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert("通信に失敗しました");
    })
  });
});
