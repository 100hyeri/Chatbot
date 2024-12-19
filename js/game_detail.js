// 콘솔 출력 코드
console.log("JavaScript is working!");

var game_id = '10';

// 예시로 특정 데이터를 콘솔에 출력하는 코드
fetch(`/api/steam?appid=${game_id}`)
    .then(response => response.json())
    .then(data => {
        console.log(data[game_id]);

        //카테고리 데이터 삽입
        const gameCategoriElement = document.querySelectorAll('.ps4-pc');
        // 순서대로 JSON 데이터의 description 값 삽입
        gameCategoriElement.forEach((pElement, index) => {
            if (data[game_id].data.categories[index]) {
                pElement.textContent = data[game_id].data.categories[index].description; // description 값으로 업데이트
            } else {
                pElement.textContent = ""; // 남는 p 태그는 비워둠
            }
        });

        //헤더 이미지 삽입
        const headerImageUrl = data[game_id].data.header_image;
        const headerImageElement = document.querySelector('.game_img');
        if (headerImageElement) {
            headerImageElement.src = headerImageUrl; // img 태그의 src 속성에 이미지 URL을 설정
        }

        //출시일 삽입
        const releaseDate = data[game_id].data.release_date.date;
        const gameDateElement = document.querySelector('.date_txt');
        if (gameDateElement) {
            gameDateElement.textContent = `${releaseDate} 출시`;
        }

        //게임 이름 삽입
        const name = data[game_id].data.name;
        // game_title 클래스에 title 값을 삽입
        const gameTitleElement = document.querySelector('.game_title');
        if (gameTitleElement) {
            gameTitleElement.textContent = name;  // title을 game_title에 삽입
        }

        //게임 appid 삽입
        const appid = data[game_id].data.steam_appid;
        const gameAppidElement = document.querySelector('.steam-appid');
        if (gameAppidElement) {
            gameAppidElement.textContent = `steam_appid: ${appid}`;
        }

        //장르 데이터 삽입
        const gamegenreElement = document.querySelector('.genre-label-text');
        // 데이터의 description 값들을 배열로 가져오기
        const genreDescriptions = data[game_id].data.genres.map(genre => genre.description);

        // 쉼표를 추가하고 마지막 값 뒤에는 쉼표를 제거
        let genreText = "";
        genreDescriptions.forEach((description, index) => {
            genreText += description;
            if (index < genreDescriptions.length - 1) {
                genreText += ", ";  // 마지막이 아니면 쉼표 추가
            }
        });

        // textContent에 출력
        if (gamegenreElement) {
            gamegenreElement.textContent = `장르: ${genreText}`;
        }


        //게임 설명 삽입
        const description = data[game_id].data.detailed_description;

        // 1. HTML 특수 문자 디코딩
        const parser = new DOMParser();
        const decodedHtml = parser.parseFromString(description, "text/html").documentElement.textContent;
        // 2. 한글만 추출 (정규식 사용)
        const description_koreanText = decodedHtml.match(/[가-힣\s]+/g)?.join("").trim();

        const gameDescriptionElement = document.querySelector('.game-content_txt');
        if (gameDescriptionElement) {
            gameDescriptionElement.textContent = description_koreanText;  // title을 game_title에 삽입
        }


        //게임 가격 삽입
        //원래 가격
        const initial_price = Number(data[game_id].data.price_overview.initial);
        // 뒤에 두 자리 제거
        const truncatedValue = Math.floor(initial_price / 100);
        // 세 자리마다 쉼표 추가(원화 변환)
        const initial_price_fommat = truncatedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        //할인된 가격
        const final_price = data[game_id].data.price_overview.final_formatted;
        //할인율
        const discount = data[game_id].data.price_overview.discount_percent;

        const gameinitialElement = document.querySelector('.price-txt');
        const gamefinalElement = document.querySelector('.discount-price-txt');
        const gamediscountElement = document.querySelector('.discount-txt');

        if (gameinitialElement) {
            gameinitialElement.textContent = `₩ ${initial_price_fommat}`;
            gamefinalElement.textContent = final_price;
            gamediscountElement.textContent = `${discount}%`;
        }


        //스크린샷 이미지 삽입
        const screenshotsElement = document.querySelectorAll('.screenshots-img');
        // 이미지를 3개씩 출력하는 함수
        function displayScreenshots(startIndex) {
            screenshotsElement.forEach((imgElement, index) => {
                const screenshotIndex = startIndex + index; // 시작 인덱스를 기준으로

                if (data[game_id].data.screenshots[screenshotIndex]) {
                    imgElement.src = data[game_id].data.screenshots[screenshotIndex].path_full;
                    imgElement.style.display = "block"; // 이미지 표시
                } else {
                    imgElement.style.display = "none"; // 이미지가 없으면 숨김
                }
            });
        }

        var currentStartIndex = 0;
        // 첫 화면 로드 시 0번 인덱스부터 3개의 이미지 출력
        displayScreenshots(currentStartIndex);

        const previousButton = document.querySelector('.previous-button');
        // 이전 버튼 클릭 시
        previousButton.addEventListener("click", function () {
            if (currentStartIndex > 0) {
                currentStartIndex -= 3; // 3개씩 이전으로
            } else {
                currentStartIndex = Math.max(0, data[game_id].data.screenshots.length - 3); // 0보다 작은 인덱스는 막음
            }
            displayScreenshots(currentStartIndex); // 이미지 다시 갱신
        });

        const nextButton = document.querySelector('.next-button');
        // 다음 버튼 클릭 시
        nextButton.addEventListener("click", function () {
            if (currentStartIndex + 3 < data[game_id].data.screenshots.length) {
                currentStartIndex += 3; // 3개씩 다음으로
            } else {
                currentStartIndex = 0; // 마지막 이미지를 넘어가면 처음으로
            }
            displayScreenshots(currentStartIndex); // 이미지 다시 갱신
        });


        //메타크리틱 점수 삽입
        const scoreElement = document.querySelector('.score-div span');
        if (scoreElement) {
            const metascore = data[game_id]?.data?.metacritic?.score; // 안전한 데이터 접근

            if (metascore !== undefined) { // 점수가 존재할 경우
                scoreElement.textContent = metascore;
            } else { // 점수가 존재하지 않을 경우 기본값 설정
                scoreElement.textContent = "X";
            }
        }
    })
    .catch(error => console.log('Error:', error));
