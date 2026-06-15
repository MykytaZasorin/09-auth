"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function NotesFilterError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Помилка фільтрації нотаток:", error);
  }, [error]);

  return (
    <div
      style={{ padding: "50px 20px", textAlign: "center", minHeight: "60vh" }}
    >
      <h2 style={{ color: "#dc3545", marginBottom: "16px" }}>
        Помилка відображення відфільтрованих нотаток
      </h2>
      <p style={{ color: "#666", marginBottom: "24px" }}>
        Щось пішло не так при завантаженні списку нотаток.
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: "10px 20px",
          backgroundColor: "#0d6efd",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Оновити дані
      </button>
    </div>
  );
}
