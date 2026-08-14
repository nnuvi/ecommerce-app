"use client";

import FeedbackModal, { FeedbackData } from "@/components/FeedBackModal";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

interface FeedbackContextType {
  showFeedback: (feedback: FeedbackData) => void;
  closeFeedback: () => void;
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(
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

export function useFeedback() {
  const context = useContext(FeedbackContext);

  if (!context) {
    throw new Error("useFeedback must be used within FeedbackProvider");
  }

  return context;
}
