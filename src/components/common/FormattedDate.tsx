"use client";
import { useEffect, useState } from "react";
type FormattedDateProps = {
  timestamp: string;
};

export function FormattedDate({ timestamp }: FormattedDateProps) {
  // Start with empty string to avoid hydration mismatch
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    // Only format the date on the client side
    setFormattedDate(new Date(timestamp).toLocaleString());
  }, [timestamp]);

  return <span>{formattedDate}</span>;
}
