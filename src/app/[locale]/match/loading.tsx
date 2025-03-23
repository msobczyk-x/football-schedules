import React from "react";
import LoadingIndicator from "@/components/common/LoadingIndicator";

export default function Loading() {
  return (
    <div className="w-full flex justify-center items-center py-12">
      <LoadingIndicator />
    </div>
  );
}
