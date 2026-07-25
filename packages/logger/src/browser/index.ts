import { browserLogger } from "./browser.js";

export const logger = browserLogger;

export const createLogger = (bindings: Record<string, unknown>) =>
  logger.child(bindings);
