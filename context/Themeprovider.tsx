"use client";

import React, { ReactNode } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemeProvider } from "next-themes";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemeProvider
        attribute="class"
        defaultTheme="light"
        themes={["dark", "light", "pink"]}>
        {children}
      </NextThemeProvider>
    </NextUIProvider>
  );
}
