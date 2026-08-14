"use client";

import { ReactNode } from "react";

type ModalType = "success" | "error" | "warning" | "info";

interface ModalProps {
  open: boolean;
  type?: ModalType;
  title: string;
  description?: string;
  children?: ReactNode;
  onClose: () => void;
  actions?: ReactNode;
}

export default function Modal({
  open,
  type = "info",
  title,
  description,
  children,
  onClose,
  actions,
}: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="mb-2 text-sm font-medium capitalize">{type}</div>

            <h2 className="text-lg font-semibold">{title}</h2>

            {description && (
              <p className="mt-2 text-sm text-gray-500">{description}</p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Content */}
        {children && <div className="mt-4">{children}</div>}

        {/* Actions */}
        {actions && (
          <div className="mt-6 flex justify-end gap-3">{actions}</div>
        )}
      </div>
    </div>
  );
}
