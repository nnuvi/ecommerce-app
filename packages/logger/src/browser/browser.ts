import type { LogData, LogLevel } from "../shared/types.js";

const LOG_ENDPOINT =
  process.env.NEXT_PUBLIC_LOG_ENDPOINT || "http://localhost:3003/api/logs";

async function send(level: LogLevel, data?: LogData, message?: string) {
  try {
    await fetch(LOG_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        level,
        message,
        ...data,
        source: "frontend",
        url: typeof window !== "undefined" ? window.location.href : undefined,
      }),
    });
  } catch {
    // Never break the UI if logging fails
  }
}

export const browserLogger = {
  info(data?: LogData, message?: string) {
    return send("info", data, message);
  },
  warn(data?: LogData, message?: string) {
    return send("warn", data, message);
  },
  error(data?: LogData, message?: string) {
    return send("error", data, message);
  },
  debug(data?: LogData, message?: string) {
    return send("debug", data, message);
  },

  child(bindings: LogData) {
    return {
      info(data?: LogData, message?: string) {
        return send("info", { ...bindings, ...data }, message);
      },
      warn(data?: LogData, message?: string) {
        return send("warn", { ...bindings, ...data }, message);
      },
      error(data?: LogData, message?: string) {
        return send("error", { ...bindings, ...data }, message);
      },
      debug(data?: LogData, message?: string) {
        return send("debug", { ...bindings, ...data }, message);
      },
    };
  },
};
