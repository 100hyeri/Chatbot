// 모든 .icon-button에 클릭 이벤트 리스너 추가
document.querySelectorAll('.icon-button').forEach(button => {
    button.addEventListener('click', function() {
      const starIcon = this.querySelector('.star-icon');
      if (starIcon.src.includes('star_button.png')) {
        starIcon.src = '/images/star_click.png'; // 이미지 변경
      } else {
        starIcon.src = '/images/star_button.png'; // 원래 이미지로 복귀
      }
    });
  });

  // 모든 li 요소에 대해 클릭 이벤트 처리
document.querySelectorAll('.nav_list').forEach(function (item) {
    item.addEventListener('click', function () {
      // 모든 li 요소에서 active 클래스 제거
      document.querySelectorAll('.nav_list a').forEach(function (link) {
        link.classList.remove('active');
      });
  
      // 클릭한 li 요소에 active 클래스 추가
      this.querySelector('a').classList.add('active');
    });
  });
  
  // 모든 li 요소에 클릭 이벤트 리스너 추가
document.querySelectorAll('.nav_list a').forEach(function (item) {
    item.addEventListener('click', function (event) {
      // 클릭한 li의 텍스트 가져오기
      const selectedMonth = event.target.textContent;
  
      // h4 요소에서 "12월" 부분을 클릭된 텍스트로 대체
      const dateTextDiv = document.querySelector('.date-text-div h4');
      dateTextDiv.textContent = selectedMonth + "의 게임추천 기록";
    });
  });
  