"use client";

import dynamic from "next/dynamic";
import React from "react";

const ColorBends = dynamic(() => import("./ColorBends"), {
  ssr: false,
});

// Using a wrapper component allows us to use ssr: false properly within the app router
export default function ColorBendsWrapper(props: React.ComponentProps<typeof ColorBends>) {
  return <ColorBends {...props} />;
}
