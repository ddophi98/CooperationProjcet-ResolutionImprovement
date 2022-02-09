window.onload = function(){
  var timerId = setInterval(updateState, 1000);
  var loaders = document.getElementsByClassName('loader')
  var downloadBtns = document.getElementsByClassName('download-btn')

  // 딥러닝 시작하기
  $.ajax({
    type: 'GET',
    url: '/deep_learning',
  }).done(function(data){
    var filenames = data.split("/")
    $(".download-all-btn").click(function(){
      for(var i = 0; i < filenames.length-1; i++){
        var element = document.createElement('a');
        element.setAttribute('href', 'static/processed_files/' + filenames[i]);
        element.setAttribute('download', filenames[i]);
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }
    });

    clearInterval(timerId);
    for(var i = 0; i < loaders.length; i++){
      if(loaders[i].style.display = 'block'){
        downloadBtns[i].style.display = 'block'
        loaders[i].style.display = 'none'
      }
    }

    setTimeout(function(){
        alert("Finish to process files")
        $(".download-all-btn").css("display","block");
    }, 100);
  }).fail(function() {
    alert("Fail to process files");
  })

  //진행상황 업데이트 하기
  function updateState(){
    $.ajax({
      type: 'GET',
      url: '/process_state',
    }).done(function(data){
      var state = data.split(" ")
      for(var j = 0; j < state.length-1; j++){
        if(state[j] == '1'){
          downloadBtns[j].style.display = 'block'
          loaders[j].style.display = 'none'
        }
      }
    })
  }
}
