import express from 'express';
import router from './routes';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

app.use(
    cors({
        origin: 'https://fullnotes-frontend.onrender.com',
        credentials: true,
    })
);

app.use(express.json());
app.use('/api', router);

export default app;
