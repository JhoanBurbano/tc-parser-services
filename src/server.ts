// src/server.ts
import app from './app';
import { CONFIG } from './config/environment.config';

app.listen(CONFIG.PORT, () => {
  console.log(`Server running on port ${CONFIG.PORT}`);
});
