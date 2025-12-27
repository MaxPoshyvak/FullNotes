import express from 'express';
import router from './routes';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: ['https://fullnotes-frontend.onrender.com', 'http://localhost:3000'],
        credentials: true,
    })
);

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.use('/api', router);

export default app;
