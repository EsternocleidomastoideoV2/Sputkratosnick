// server.js
const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Endpoint de stream de vídeo
app.get('/live', async (req, res) => {
  const videoUrl = 'https://www.youtube.com/watch?v=jfKfPfyJRdk'; // Exemplo: Lofi Girl Live

  try {
    const info = await ytdl.getInfo(videoUrl);
    const format = ytdl.chooseFormat(info.formats, { quality: 'highest' });
    res.setHeader('Content-Type', 'video/mp4');
    ytdl(videoUrl, { format }).pipe(res);
  } catch (err) {
    res.status(500).send('Erro ao buscar live');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
