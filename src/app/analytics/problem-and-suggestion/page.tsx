
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProblemAndSuggestionRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/analytics/problem-and-suggestion/details');
  }, [router]);

  return null;
}
