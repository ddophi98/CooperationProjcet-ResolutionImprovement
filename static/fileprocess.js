window.onload = function(){
  var sec = document.querySelector('#sec');
  var uploadBox = document.querySelector('.upload-box');
  var selectedZone = document.querySelector(".selected-zone");
  var processBtn = document.querySelector('.process-btn');
  var selectedFiles = [];

  // 선택된 파일 처리하기
  function processFiles(files){
    if (files != null) {
      selectedZone.innerHTML = ""
      notAllowed = false;
      selectedFiles = []
      for(var i = 0, len = files.length; i < len; i++) {
        if(files[i].type.includes("image") || files[i].type.includes("video")){
          selectedZone.innerHTML += files[i].name + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
          selectedFiles.push(files[i]);
        } else{
          notAllowed = true;
        }
      }
      processBtn.style.display = 'block';

      if(notAllowed){
        alert("Not available to upload other files except image or video");
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
  });

  // 박스 밖으로 Drag가 나갈 때
  uploadBox.addEventListener('dragleave', function(e) {
     this.style.backgroundColor = 'white';
  });


  // 박스 안에서 Drag를 Drop했을 때
  uploadBox.addEventListener('drop', function(e) {
     e.preventDefault();
     this.style.backgroundColor = 'white';

     var files = e.dataTransfer && e.dataTransfer.files;
     processFiles(files)

  });


  // 버튼으로 파일 선택했을 때
  var inputBtn = document.querySelector(".input-btn");
  inputBtn.addEventListener('change', function(e) {
    var files = this.files;
    processFiles(files);
  });

  // 파일 처리 버튼 눌렀을 때
  processBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const formData = new FormData();
    for(var i = 0; i < selectedFiles.length; i++){
      formData.append('uploadFile[]', selectedFiles[i]);
    }

    $.ajax({
      type: 'POST',
      url: '/process',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
      success: function(r){
        console.log("성공")
        console.log(selectedFiles.length)
      }
    })

    //location.href = "./process"
  });
}
