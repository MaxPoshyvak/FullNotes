import dotenv from 'dotenv';
import Database from './config/db';

dotenv.config();

import app from './app';

const PORT = process.env.PORT || 3000;

(async () => {
    await Database.getInstance(); // Connect to MongoDB
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
})();
