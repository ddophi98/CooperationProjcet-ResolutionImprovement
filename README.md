# Resolution-Improvement-Website
- 머신러닝을 이용해 이미지의 화질을 보다 선명하게 만들어 주는 웹사이트 입니다.
- 사전에 SRGAN 모델을 학습시켜놓을 후 사용중입니다.
- Flask를 이용하여 파이썬 서버 상에서 html 코드가 실행될 수 있도록 합니다.

링크: http://ddophi.pythonanywhere.com/ 

한계점
- 무료 도메인이다 보니 웹페에지 동시 접속, 서버 내 AJAX 동작 등에 대해 문제가 있어 보입니다.
- 학습 데이터와 학습 시간이 부족하다 보니 특정 이미지에 대해서는 오히려 상태가 안좋아지기도 합니다. 

<div style="display:flex">
  <img width="200" src="https://user-images.githubusercontent.com/72330884/156921775-d6a783e6-dd1d-444b-9734-365ecf00d260.PNG">
  <img width="200" src="https://user-images.githubusercontent.com/72330884/156921776-5aa9f8c1-4682-45fc-b2d1-91acd18547e8.PNG">
</div>

Before / After
<div style="display:flex">
  <img width="200" src="https://user-images.githubusercontent.com/72330884/156921777-728cb7f1-f67a-4872-a1ac-ffb02e06bec1.jpg">
  <https://user-images.githubusercontent.com/72330884/156921778-239375b3-3e38-4859-ba12-f891b21d7b38.jpg">
</div>
