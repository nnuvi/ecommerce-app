// // src/logger.ts
// import { browserLogger } from "./browser/browser.js";
// import { serverLogger } from "./server/server.js";

// const isBrowser = typeof window !== "undefined";

// export const logger = isBrowser ? browserLogger : serverLogger;

// export const createLogger = (bindings: Record<string, unknown>) =>
//   logger.child(bindings);
