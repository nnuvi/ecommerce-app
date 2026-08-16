// import pino from "pino";
// import path from "path";

// const service = path.basename(process.cwd());

// export const serverLogger = pino({
//   base: {
//     service,
//   },
//   transport: {
//     target: "pino-pretty",
//     options: {
//       colorize: true,
//       translateTime: "yyyy-mm-dd HH:MM:ss",
//       ignore: "pid,hostname",
//     },
//   },
// });

import pino from "pino";
import path from "path";

const service =
  process.env.SERVICE_NAME || path.basename(process.cwd()) || "unknown-service";

const isProd = process.env.NODE_ENV === "production";

export const serverLogger = pino({
  base: {
    service,
  },
  level: process.env.LOG_LEVEL ?? "debug",
  timestamp: pino.stdTimeFunctions.isoTime,

  ...(!isProd && {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "yyyy-mm-dd HH:MM:ss",
        ignore: "pid,hostname",
        singleLine: false,
      },
    },
  }),
});
