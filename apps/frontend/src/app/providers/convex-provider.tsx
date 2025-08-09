"use client";

import { ConvexProvider as ConvexProviderBase } from "convex/react";
import { ConvexReactClient } from "convex/react";
import type { ReactNode } from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

interface ConvexProviderProps {
  children: ReactNode;
}

export function ConvexProvider({ children }: ConvexProviderProps) {
  return <ConvexProviderBase client={convex}>{children}</ConvexProviderBase>;
}