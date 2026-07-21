// import { SignIn } from "@clerk/nextjs";

// export default function Page() {
//   return (
//     <div className="flex items-center justify-center mt-16">
//       <SignIn />
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { SignIn, useClerk, useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const { signIn } = useSignIn();

  const loginDemo = async () => {
    console.log("Demo login clicked");

    const { error } = await signIn.password({
      identifier: "demo+clerk_test@example.com",
      password: "GenDemoPass123!",
    });
    // console.log("signIn", signIn);
    // console.log("Object.keys(signIn", Object.keys(signIn));
    // console.log("signIn.supportedFirstFactors", signIn.supportedFirstFactors);
    // console.log(
    //   "signIn.secondFactorVerification",
    //   signIn.secondFactorVerification,
    // );
    // console.log("signIn.supportedSecondFactors", signIn.supportedSecondFactors);
    // console.log(error);
    // console.log(signIn.status);

    if (error) {
      console.error(error);
      return;
    }

    if (signIn.status === "needs_second_factor") {
      await signIn.mfa.sendEmailCode();

      await signIn.mfa.verifyEmailCode({
        code: "424242",
      });
    }

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: () => router.replace("/"),
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-16">
      <div className="flex px-9 py-2 rounded-4xl bg-stone-800 mb-4">
        <button className="text-amber-50" onClick={loginDemo}>
          Use Demo Account
        </button>
      </div>
      <SignIn />
    </div>
  );
}
