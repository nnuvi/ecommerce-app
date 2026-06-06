import Link from "next/link";
import { ShieldX, ArrowLeft, Lock } from "lucide-react";
import SignInAgainButton from "@/components/SignInAgainButton";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
      <div className="w-full max-w-lg rounded-3xl border border-stone-200 bg-white p-10 shadow-xl">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <ShieldX className="h-10 w-10 text-red-600" />
        </div>

        {/* Heading */}
        <h1 className="text-center text-4xl font-bold text-stone-800">
          Unauthorized Access
        </h1>

        {/* Subtext */}
        <p className="mt-4 text-center text-stone-500 leading-relaxed">
          You do not have permission to access this page.
          Please sign in with an authorized administrator account.
        </p>

        {/* Info Box */}
        <div className="mt-8 rounded-lg bg-stone-50 border border-stone-200 p-4">
          <div className="flex items-start gap-3">
            <Lock className="mt-0.5 h-5 w-5 text-stone-500 shrink-0" />
            <p className="text-sm text-stone-600">
              If you believe this is a mistake, contact your system administrator
              to request the necessary permissions.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center rounded-4xl bg-stone-800 px-5 py-3 text-sm font-medium text-white hover:bg-stone-700 transition-colors"
          >
            Go to Dashboard
          </Link>

          <SignInAgainButton />
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-stone-400">
          Error 403 · Access Denied
        </p>
      </div>
    </div>
  );
}