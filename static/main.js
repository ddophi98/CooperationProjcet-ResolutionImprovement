window.onload = function(){
  var sec = document.querySelector('#sec');
  var uploadBox = document.querySelector('.upload-box');
  var selectedZone = document.querySelector(".selected-zone");
  var uploadBtn = document.querySelector('.upload-btn');
  var selectedFiles = [];

  // 선택된 파일 업로드 할 준비하기
  function uploadFiles(files){
    if (files != null) {
      selectedZone.innerHTML = ""
      notAllowed = false;
      selectedFiles = []
      for(var i = 0, len = files.length; i < len; i++) {
        if(files[i].type.includes("image")){
          selectedZone.innerHTML += files[i].name + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
          selectedFiles.push(files[i]);
        } else{
          notAllowed = true;
        }
      }
      uploadBtn.style.display = 'block';

      if(notAllowed){
        alert("Not available to upload other files except image");
      }
    } else{
      alert("Fail to upload");
    }
  }

  // 박스 안에 Drag를 하고 있을 때
  uploadBox.addEventListener('dragover', function(e) {
     e.preventDefault();
     var vaild = e.dataTransfer.types.indexOf('Files') >= 0;

     if(!vaild){
         this.style.backgroundColor = 'red';
     }
     else{
         this.style.backgroundColor = 'rgb(115, 212, 143)';
     }
  })

  // 박스 밖으로 Drag가 나갈 때
  uploadBox.addEventListener('dragleave', function(e) {
     this.style.backgroundColor = 'white';
  })


  // 박스 안에서 Drag를 Drop했을 때
  uploadBox.addEventListener('drop', function(e) {
     e.preventDefault();
     this.style.backgroundColor = 'white';

     var files = e.dataTransfer && e.dataTransfer.files;
     uploadFiles(files)

  })


  // 버튼으로 파일 선택했을 때
  var inputBtn = document.querySelector(".input-btn");
  inputBtn.addEventListener('change', function(e) {
    var files = this.files;
    uploadFiles(files);
  })

  // 파일 처리 버튼 눌렀을 때
  uploadBtn.addEventListener('click', function(e) {
    e.preventDefault();

    if(selectedFiles.length == 0){
      alert("Select at least one file");
    }else{
      $(".loader").css("display","block");
      $("#sec").css("display","none");

      const formData = new FormData();
      for(var i = 0; i < selectedFiles.length; i++){
        formData.append('uploadFile[]', selectedFiles[i]);
      }

      $.ajax({
        type: 'POST',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
      }).done(function(){
        location.href = "./upload"
      }).fail(function() {
        alert("Something's wrong. Please try again");
        $(".loader").css("display","none");
        $("#sec").css("display","block");
        selectedZone.innerHTML = "";
      }).always(function(){
        $(".input-btn").val("");
      })
    }
  })
}
