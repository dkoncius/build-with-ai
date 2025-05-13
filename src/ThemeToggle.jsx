import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark((d) => !d)}
      style={{
        padding: "0.5em 1.2em",
        borderRadius: "999px",
        border: "none",
        background: dark
          ? "linear-gradient(90deg, #00eaff 0%, #ff2d7a 100%)"
          : "#14243a",
        color: "#fff",
        cursor: "pointer",
        fontWeight: "bold",
        margin: "1em",
        boxShadow: dark
          ? "0 0 16px #00eaff88, 0 0 32px #ff2d7a55"
          : "0 0 8px #14243a55"
      }}
      aria-label="Perjungti temą"
    >
      {dark ? "Šviesus režimas" : "Tamsus režimas"}
    </button>
  );
} 