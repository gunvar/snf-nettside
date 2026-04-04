"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { useEffect } from "react";

export default function StudioPage() {
  useEffect(() => {
    // Hide site header and footer when Studio is active
    document.body.classList.add("studio-active");
    return () => {
      document.body.classList.remove("studio-active");
    };
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw", position: "fixed", top: 0, left: 0, zIndex: 100 }}>
      <NextStudio config={config} />
    </div>
  );
}
