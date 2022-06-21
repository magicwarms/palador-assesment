/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
dotenv.config();
import app from "./index";
import { Server } from "http";

/**
 * Set timezone
 */
process.env.TZ = "Asia/Jakarta";

// define var for current server time
const currentTime =
  new Date().toJSON().slice(0, 10).replace(/-/g, "/") +
  " " +
  new Date(Date.now()).toTimeString();
/**
 * App Variables
 */
if (!process.env.PORT) {
  console.log(`Server exit without set PORT`);
  process.exit(1);
}

const PORT: number | string = process.env.PORT || 9000;

// ensures we close the server in the event of an error.
const setupCloseOnExit = (server: Server) => {
  async function exitHandler(options = { exit: false }) {
    server.close(() => {
      if (options.exit) {
        console.info(`Server successfully closed at ${currentTime}`);
        process.exit(1);
      }
    });
  }

  // do something when app is closing
  process.on("exit", exitHandler);
  // catches ctrl+c event
  process.on("SIGINT", exitHandler.bind(null, { exit: true }));
  // catches "kill pid" (for example: nodemon restart)
  process.on("SIGUSR1", exitHandler.bind(null, { exit: true }));
  process.on("SIGUSR2", exitHandler.bind(null, { exit: true }));
  // catches uncaught exceptions
  process.on("uncaughtException", exitHandler.bind(null, { exit: true }));
};

/**
 * Server Activation
 */
const startServer = () => {
  return new Promise((resolve) => {
    const server = app.listen(PORT, () => {
      console.info(
        `⚡️[palador-backend]: Server is running at ${process.env.APP_LINK}:${PORT} - ${currentTime} - ${process.env.NODE_ENV}`
      );
      // this ensures that we properly close the server when the program exists
      setupCloseOnExit(server);
      // resolve the whole promise with the express server
      resolve(server);
    });
  });
};

/**
 * Setup server connection here
 */
const startingServer = async () => {
  console.info("The server successfully started!");
  // activate if development mode
  startServer()
    .then()
    .catch((err) => console.error(err));
};
/**
 * Start server now
 */
startingServer();
