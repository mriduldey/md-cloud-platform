import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (_, res) => {
    res.send('🚀 md-cloud-platform API is up and running!');
});

app.listen(PORT, () => {
    console.log(`API server listening on http://localhost:${PORT}`);
});