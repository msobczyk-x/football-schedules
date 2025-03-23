"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "inline-flex w-full rounded-xl p-1 backdrop-blur-md bg-white/10 border border-white/20 shadow-lg",
        "relative overflow-hidden",
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex w-full items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium",
        "rounded-lg transition-all duration-300 whitespace-nowrap",
        "text-white/70 hover:text-white",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
        "disabled:pointer-events-none disabled:opacity-50",

        // Default state
        "border border-transparent",

        // Active state
        "data-[state=active]:bg-white/20 data-[state=active]:text-white",
        "data-[state=active]:shadow-sm data-[state=active]:border-white/30",

        // Icon styling
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",

        className
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
