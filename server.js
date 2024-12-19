import express from 'express';
import fetch from 'node-fetch';
import path from 'path';

const app = express();
const PORT = 3000;

// 현재 디렉토리 경로 설정
const __dirname = path.resolve();

// 정적 파일 제공 (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));


app.get('/api/steam', async (req, res) => {
    // 쿼리 파라미터에서 appid를 가져옴
    const { appid } = req.query;

    // appid가 없으면 400 Bad Request를 응답
    if (!appid) {
        return res.status(400).json({ error: 'appid is required' });
    }

    // 동적으로 appid를 URL에 삽입
    const apiUrl = `https://store.steampowered.com/api/appdetails?appids=${appid}&l=korean`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // API 호출이 성공하면 데이터를 클라이언트로 전달
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        // API 호출 실패 시 500 상태 코드와 오류 메시지 전달
        res.status(500).json({ error: 'Failed to fetch Steam API data' });
    }
});


// 서버 실행
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/html/game_detail.html`);
});
