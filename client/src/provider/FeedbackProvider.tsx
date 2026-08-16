"use client";

import FeedbackModal, { FeedbackData } from "@/components/FeedBackModal";
import { createContext, ReactNode, useCallback, useState } from "react";

interface FeedbackContextType {
  showFeedback: (feedback: FeedbackData) => void;
  closeFeedback: () => void;
}

export const FeedbackContext = createContext<FeedbackContextType | undefined>(
  undefined,
);

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);

  const showFeedback = useCallback((data: FeedbackData) => {
    setFeedback(data);
  }, []);

  const closeFeedback = useCallback(() => {
    setFeedback(null);
  }, []);

  return (
    <FeedbackContext.Provider
      value={{
        showFeedback,
        closeFeedback,
      }}
    >
      {children}

      <FeedbackModal feedback={feedback} onClose={closeFeedback} />
    </FeedbackContext.Provider>
  );
}
