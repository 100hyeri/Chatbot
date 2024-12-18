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