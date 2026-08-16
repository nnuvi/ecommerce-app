import { loggerBrowser } from "./browser.js";

export const logger = loggerBrowser;

// export const createLogger = (bindings: Record<string, unknown>) =>
//   logger.child(bindings);
