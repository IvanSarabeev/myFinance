import { connect } from "./database/connection.js";
import { PORT, RESERVE_PORT } from "./config/env.js";
import { logMessage } from "./utils/helpers.js";
import app from "./app.js";
import {LOG_MESSAGE_TYPES} from "./defines.js";

(async () => {
  try {
    await connect();

    app.listen(PORT ?? RESERVE_PORT, () => {
      logMessage(null, `✅ Server running on port: ${PORT ?? RESERVE_PORT}`, LOG_MESSAGE_TYPES.Success);
    });
  } catch (error) {
    logMessage(error, `❌ Failed to start server: ${ error}`);

    // eslint-disable-next-line no-undef
    process.exit(1);
  }
})();
