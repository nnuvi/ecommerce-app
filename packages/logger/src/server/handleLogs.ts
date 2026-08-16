// // src/handle-log.ts
// import { logger } from "./index.js";
// import type { LogLevel } from "../shared/types.js";

// export const handleLogRequest = (
//   req: {
//     body: {
//       level?: LogLevel;
//       message?: string;
//       [key: string]: unknown;
//     };
//   },
//   res: {
//     sendStatus: (code: number) => unknown;
//   },
// ) => {
//   const { level = "info", message, ...meta } = req.body || {};

//   const allowedLevels: LogLevel[] = ["info", "warn", "error", "debug"];

//   const safeLevel = allowedLevels.includes(level) ? level : "info";

//   logger[safeLevel](
//     {
//       source: "frontend",
//       ...meta,
//     },
//     message || "Frontend log",
//   );

//   return res.sendStatus(200);
// };
