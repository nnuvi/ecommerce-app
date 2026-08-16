"use client";

export type FeedbackType = "success" | "error" | "warning" | "info" | "confirm";

export interface FeedbackData {
  type: FeedbackType;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
}

interface FeedbackModalProps {
  feedback: FeedbackData | null;
  onClose: () => void;
}

export default function FeedbackModal({
  feedback,
  onClose,
}: FeedbackModalProps) {
  if (!feedback) return null;

  const isConfirm = feedback.type === "confirm";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            {feedback.type === "success" && "✓"}
            {feedback.type === "error" && "!"}
            {feedback.type === "warning" && "!"}
            {feedback.type === "info" && "i"}
            {feedback.type === "confirm" && "?"}
          </div>

          {(feedback.title || feedback.message) && (
            <div className="mt-4">
              {feedback.title && (
                <h2 className="text-lg font-semibold mb-2">{feedback.title}</h2>
              )}

              {feedback.message && (
                <p className="text-sm text-gray-500">{feedback.message}</p>
              )}
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-center gap-3">
          {isConfirm ? (
            <>
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border px-4 py-2 text-sm"
              >
                {feedback.cancelText ?? "Cancel"}
              </button>

              <button
                type="button"
                onClick={() => {
                  feedback.onConfirm?.();
                  onClose();
                }}
                className="rounded-md bg-black px-4 py-2 text-sm text-white"
              >
                {feedback.confirmText ?? "Confirm"}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-black px-4 py-2 text-sm text-white"
            >
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
