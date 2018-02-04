$(function() {
  $("#new_message").on("submit", function(e) {  //イベントはsubmitボタンではなくformにかける。formのidまたはクラスを参照すること。
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");

    for(item of formData){
      console.log(item);
    }
    console.log(url);

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data){
    })
    .fail(function(){
      alert("failed");
    })
  });
});



