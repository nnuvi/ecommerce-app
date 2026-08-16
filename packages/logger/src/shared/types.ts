// export type LogLevel = "info" | "warn" | "error" | "debug";

// export type LogData = Record<string, unknown>;

// export type LogScope =
//   | "api"
//   | "service"
//   | "database"
//   | "auth"
//   | "frontend"
//   | "system";

// export interface Logger {
//   info(obj: Record<string, unknown>, msg?: string): void;
//   info(msg: string, ...args: unknown[]): void;

//   warn(obj: Record<string, unknown>, msg?: string): void;
//   warn(msg: string, ...args: unknown[]): void;

//   error(obj: Record<string, unknown>, msg?: string): void;
//   error(msg: string, ...args: unknown[]): void;

//   debug(obj: Record<string, unknown>, msg?: string): void;
//   debug(msg: string, ...args: unknown[]): void;

//   child(bindings: Record<string, unknown>): Logger;
// }

// shared/types.ts

// src/shared/types.ts

// shared/types.ts

export type LogLevel = "debug" | "info" | "warn" | "error" | "http";

export interface LogRequest {
  method: string;
  path: string;
  statusCode?: number;
  durationMs?: number;
  requestId?: string;
}

export interface LogError {
  name?: string;
  message: string;
  stack?: string;
  code?: string;
  step?: string;
}

export interface LogData {
  scope?: string;
  request?: LogRequest;
  [key: string]: unknown;
}

export interface Logger {
  debug(message: string, data?: LogData): void;

  info(message: string, data?: LogData): void;

  warn(message: string, data?: LogData): void;

  error(message: string, error?: unknown, data?: LogData): void;

  http(message: string, data?: LogData): void;
}
