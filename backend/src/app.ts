import express from 'express';
import router from './routes';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                ...helmet.contentSecurityPolicy.getDefaultDirectives(),
                // 1. Дозволяємо скрипти (всі хеші з вашої консолі)
                'script-src': [
                    "'self'",
                    "'sha256-OBTN3RiyCV4Bq7dFqZ5a2pAXjnCcCYeTJMO2I/LYKeo='", // Старий
                    "'sha256-6LU9PSbLOz3Fut6nSXIUTAR/I8FA+yDUlMq4ITGptFo='", // Старий
                    "'sha256-zSosKOsZVFrezBWW3FR2g7W37YEb3joSvRUwHNbmKrU='", // Новий
                    "'sha256-CRBN/fH/CfT4EZGt3lULeOdHJGGaOefA6GHHVE/9Ow4='", // Новий
                    "'sha256-xiRz0wX/L2QNFUSelY6FG0GQSHWhuGpD0sAOkVt059c='", // Новий
                ],
                // 2. Дозволяємо стилі (вирішує помилку style-src-attr)
                'style-src': [
                    "'self'",
                    "'unsafe-inline'", // Дозволяє писати style="..." у HTML (потрібно для анімацій)
                ],
                // 3. Дозволяємо підключення до бекенду (вирішує Connection closed, якщо це через CSP)
                'connect-src': ["'self'", 'http://localhost:3000', 'https://fullnotes-frontend.onrender.com'],
                // 4. Дозволяємо картинки (включаючи data: для іконок/svg)
                'img-src': ["'self'", 'data:', 'https:'],
            },
        },
    })
);
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);

app.use(express.json());
app.use('/api', router);

export default app;
