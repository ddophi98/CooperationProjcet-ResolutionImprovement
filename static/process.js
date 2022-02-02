window.onload = function(){
  var timerId = setInterval(updateProgress, 500);
  var progressBars = document.getElementsByClassName('progressBar')
  var downloadBtns = document.getElementsByClassName('download-btn')
  var downloadAllBtn = document.getElementById('download-all-btn')

  // 딥러닝 시작하기
  $.ajax({
    type: 'GET',
    url: '/deep_learning',
  }).done(function(){
    $(".download-all").css("display","block");
    clearInterval(timerId);
    alert("Finish to process files");
  }).fail(function() {
    alert("Fail to process files");
  })

  //각 프로그레스 바 업데이트 하기
  function updateProgress(){
    for(var i = 0; i < progressBars.length; i++){
      $.ajax({
        type: 'GET',
        url: '/process_state',
        data: {'idx': i.toString()}
      }).done(function(data){
        var temp = data.split(" ")
        progressBars[parseInt(temp[0])].value = parseInt(temp[1]);
        if (temp[1] == '100'){
          downloadBtns[parseInt(temp[0])].style.visibility = 'visible'
        }
      })
    }
  }
}
