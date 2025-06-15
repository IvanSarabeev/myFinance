import { connect } from "./database/connection.js";
import { PORT, RESERVE_PORT } from "./config/env.js";
import { logMessage } from "./utils/helpers.js";
import app from "./app.js";

(async () => {
  try {
    await connect();

    logMessage(null, "✅ Database connection started.", 'success');

    app.listen(PORT ?? RESERVE_PORT, () => {
      logMessage(null, `✅ Server running on port: ${PORT ?? RESERVE_PORT}`, 'success');
    });
  } catch (error) {
    logMessage(error, `❌ Failed to start server: ${ error}`, 'error');

    // eslint-disable-next-line no-undef
    process.exit(1);
  }
})();
