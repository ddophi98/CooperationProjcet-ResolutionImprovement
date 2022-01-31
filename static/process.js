window.onload = function(){
  $.ajax({
    type: 'GET',
    url: '/deep_learning',
  }).done(function(){
    alert("Start to process files");
  }).fail(function() {
    alert("Fail to process files");
  })
}
