import { FeedbackContext } from "@/provider/FeedbackProvider";
import { useContext } from "react";

export function useFeedback() {
  const context = useContext(FeedbackContext);

  if (!context) {
    throw new Error("useFeedback must be used within FeedbackProvider");
  }

  const { showFeedback, closeFeedback } = context;

  return {
    showFeedback,

    success: (message: string, title?: string) =>
      showFeedback({
        type: "success",
        message,
        title: title ?? "Success",
      }),

    error: (message: string, title?: string) =>
      showFeedback({
        type: "error",
        message,
        title: title ?? "Error",
      }),

    warning: (message: string, title?: string) =>
      showFeedback({
        type: "warning",
        message,
        title: title ?? "Warning",
      }),

    info: (message: string, title?: string) =>
      showFeedback({
        type: "info",
        message,
        title: title ?? "Info",
      }),

    close: closeFeedback,
  };
}
