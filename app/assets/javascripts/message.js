$(function() {
  $("#new_message").on("submit", function(e) {  //イベントはsubmitボタンではなくformにかける。formのidまたはクラスを参照すること。
    e.preventDefault();
  });
});



