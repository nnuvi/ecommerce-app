// lib/logger/browser.ts

import type { LogData, LogLevel } from "../shared/types";

const LOG_ENDPOINT =
  process.env.NEXT_PUBLIC_LOG_ENDPOINT ?? "http://localhost:3003/api/logs";

const client = process.env.NEXT_PUBLIC_LOGGER_SERVICE ?? "unknown-client";

function formatTime(date = new Date()) {
  const pad = (value: number, size = 2) => String(value).padStart(size, "0");

  return (
    `${date.getFullYear()}-` +
    `${pad(date.getMonth() + 1)}-` +
    `${pad(date.getDate())} ` +
    `${pad(date.getHours())}:` +
    `${pad(date.getMinutes())}:` +
    `${pad(date.getSeconds())}.` +
    `${pad(date.getMilliseconds(), 3)}`
  );
}

// function formatMessage(level: LogLevel, message: string, data?: LogData) {
//   const scope = typeof data?.scope === "string" ? data.scope : "app";

//   return `[${formatTime()}] [${level.toUpperCase()}] [${client.toUpperCase()}] [${scope}] ${message}`;
// }

async function sendToServer(level: LogLevel, message: string, data?: LogData) {
  try {
    await fetch(LOG_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timestamp: formatTime(),
        level,
        client,
        message,
        ...data,
        source: "browser",
        url: window.location.href,
      }),
    });
  } catch {
    // Logging must never break the application
  }
}

function log(level: LogLevel, message: string, data?: LogData) {
  // if (level === "http") {
  void sendToServer(level, message, data);
  // } else {
  //   const formatted = formatMessage(level, message, data);

  //   const consoleMethod =
  //     level === "error"
  //       ? console.error
  //       : level === "warn"
  //         ? console.warn
  //         : console.log;

  //   consoleMethod(formatted);

  //   if (data) {
  //     consoleMethod(data);
  //   }
  // }
}

export const loggerBrowser = {
  debug(message: string, data?: LogData) {
    log("debug", message, data);
  },

  info(message: string, data?: LogData) {
    log("info", message, data);
  },

  warn(message: string, data?: LogData) {
    log("warn", message, data);
  },

  error(message: string, error?: unknown, data?: LogData) {
    log("error", message, {
      ...data,
      error:
        error instanceof Error
          ? {
              name: error.name,
              message: error.message,
              stack: error.stack,
            }
          : error,
    });
  },

  http(message: string, data?: LogData) {
    log("http", message, data);
  },
};

// import type { LogData, LogLevel } from "../types";

// const service =
//   process.env.NEXT_PUBLIC_SERVICE_NAME ?? "client";

// const LOG_ENDPOINT =
//   process.env.NEXT_PUBLIC_LOG_ENDPOINT ??
//   "http://localhost:3003/api/logs";

// function send(
//   level: LogLevel,
//   message: string,
//   data?: LogData,
// ) {
//   const log = {
//     timestamp: new Date().toISOString(),
//     level,
//     service,
//     message,
//     ...data,
//     source: "browser",
//     url: window.location.href,
//   };

//   console.log(
//     `[${log.timestamp}] [${level.toUpperCase()}] [${service}] ${message}`,
//     data ?? "",
//   );

//   void fetch(LOG_ENDPOINT, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(log),
//   }).catch(() => {});
// }

// function createLogger(bindings: LogData) {
//   return {
//     debug(message: string, data?: LogData) {
//       send("debug", message, {
//         ...bindings,
//         ...data,
//       });
//     },

//     info(message: string, data?: LogData) {
//       send("info", message, {
//         ...bindings,
//         ...data,
//       });
//     },

//     warn(message: string, data?: LogData) {
//       send("warn", message, {
//         ...bindings,
//         ...data,
//       });
//     },

//     error(
//       message: string,
//       error?: unknown,
//       data?: LogData,
//     ) {
//       send("error", message, {
//         ...bindings,
//         ...data,
//         error:
//           error instanceof Error
//             ? {
//                 name: error.name,
//                 message: error.message,
//                 stack: error.stack,
//               }
//             : error,
//       });
//     },

//     http(message: string, data?: LogData) {
//       send("http", message, {
//         ...bindings,
//         ...data,
//       });
//     },
//   };
// }

// export const logger_browser = {
//   debug(message: string, data?: LogData) {
//     send("debug", message, data);
//   },

//   info(message: string, data?: LogData) {
//     send("info", message, data);
//   },

//   warn(message: string, data?: LogData) {
//     send("warn", message, data);
//   },

//   error(
//     message: string,
//     error?: unknown,
//     data?: LogData,
//   ) {
//     send("error", message, {
//       ...data,
//       error:
//         error instanceof Error
//           ? {
//               name: error.name,
//               message: error.message,
//               stack: error.stack,
//             }
//           : error,
//     });
//   },

//   http(message: string, data?: LogData) {
//     send("http", message, data);
//   },

//   child(bindings: LogData) {
//     return createLogger(bindings);
//   },
// };

// import type { LogData, LogLevel } from "../shared/types.js";

// const LOG_ENDPOINT =
//   process.env.NEXT_PUBLIC_LOG_ENDPOINT || "http://localhost:3003/api/logs";

// async function send(level: LogLevel, data?: LogData, message?: string) {
//   try {
//     await fetch(LOG_ENDPOINT, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         level,
//         message,
//         ...data,
//         source: "frontend",
//         url: typeof window !== "undefined" ? window.location.href : undefined,
//       }),
//     });
//   } catch {
//     // Never break the UI if logging fails
//   }
// }

// export const browserLogger = {
//   info(data?: LogData, message?: string) {
//     return send("info", data, message);
//   },
//   warn(data?: LogData, message?: string) {
//     return send("warn", data, message);
//   },
//   error(data?: LogData, message?: string) {
//     return send("error", data, message);
//   },
//   debug(data?: LogData, message?: string) {
//     return send("debug", data, message);
//   },

//   child(bindings: LogData) {
//     return {
//       info(data?: LogData, message?: string) {
//         return send("info", { ...bindings, ...data }, message);
//       },
//       warn(data?: LogData, message?: string) {
//         return send("warn", { ...bindings, ...data }, message);
//       },
//       error(data?: LogData, message?: string) {
//         return send("error", { ...bindings, ...data }, message);
//       },
//       debug(data?: LogData, message?: string) {
//         return send("debug", { ...bindings, ...data }, message);
//       },
//     };
//   },
// };
