
"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="relative flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/10 blur-[100px]"></div>
      </div>
      <div className="mb-8 text-center">
        <Skeleton className="h-10 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-1/2 mt-4 mx-auto" />
      </div>
      <div className="mb-8">
        <Skeleton className="h-10 w-24" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(11)].map((_, i) => (
          <div key={i} className="flex">
            <div className="flex flex-col text-left p-6 bg-card/60 backdrop-blur-sm border-2 border-transparent w-full rounded-lg">
                <Skeleton className="h-10 w-10 mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Skeleton className="h-16 w-full max-w-sm" />
      </div>
    </div>
  );
}
