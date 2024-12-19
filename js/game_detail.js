// 콘솔 출력 코드
console.log("JavaScript is working!");

// 예시로 특정 데이터를 콘솔에 출력하는 코드
fetch('/api/steam')
  .then(response => response.json())
  .then(data => {
    const name = data['10'].data.name;
    console.log('Game Name:', name);  // 게임 이름 출력

    // // title 추출 (package_groups의 title)
    // const title = data['10'].data.package_groups[0].title;
    // console.log('Title:', title);  // title 출력

    // game_title 클래스에 title 값을 삽입
    const gameTitleElement = document.querySelector('.game_title');
    if (gameTitleElement) {
      gameTitleElement.textContent = name;  // title을 game_title에 삽입
    }
  })
  .catch(error => console.log('Error:', error));
