import express from 'express';
import fetch from 'node-fetch';
import path from 'path';

const app = express();
const PORT = 3000;

// 현재 디렉토리 경로 설정
const __dirname = path.resolve();

// 정적 파일 제공 (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));


// Steam API 데이터를 가져오는 라우트
app.get('/api/steam', async (req, res) => {
    const apiUrl = 'https://store.steampowered.com/api/appdetails?appids=10&l=korean';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data); // 클라이언트로 JSON 데이터 전달
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch Steam API data' });
    }
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/html/game_detail.html`);
});
