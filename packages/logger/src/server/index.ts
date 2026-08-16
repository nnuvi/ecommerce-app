import { serverLogger } from "./server.js";

export const logger = serverLogger;

export const createLogger = (bindings: Record<string, unknown>) =>
  logger.child(bindings);

// export { handleLogRequest } from "./handleLogs.js";
