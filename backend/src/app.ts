import express from 'express';
import router from './routes';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            ...helmet.contentSecurityPolicy.getDefaultDirectives(),
            'script-src': [
                "'self'",
                "'sha256-OBTN3RiyCV4Bq7dFqZ5a2pAXjnCcCYeTJMO2I/LYKeo='",
                "'sha256-6LU9PSbLOz3Fut6nSXIUTAR/I8FA+yDUlMq4ITGptFo='",
            ],
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
