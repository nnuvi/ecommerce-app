// // src/logger.ts
// import { browserLogger } from "./browser/browser.js";
// import { serverLogger } from "./server/server.js";

// const isBrowser = typeof window !== "undefined";

// export const logger = isBrowser ? browserLogger : serverLogger;

// export const createLogger = (bindings: Record<string, unknown>) =>
//   logger.child(bindings);

// shared/logger.ts

// import type { LogData } from "./types";

// export interface Logger {
//   debug(
//     message: string,
//     data?: LogData,
//   ): void;

//   info(
//     message: string,
//     data?: LogData,
//   ): void;

//   warn(
//     message: string,
//     data?: LogData,
//   ): void;

//   error(
//     message: string,
//     error?: unknown,
//     data?: LogData,
//   ): void;
// }
