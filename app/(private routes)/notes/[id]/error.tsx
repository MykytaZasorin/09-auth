"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function NoteDetailsError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Помилка завантаження нотатки:", error);
  }, [error]);

  return (
    <div
      style={{ padding: "50px 20px", textAlign: "center", minHeight: "60vh" }}
    >
      <h2 style={{ color: "#dc3545", marginBottom: "16px" }}>
        Не вдалося завантажити деталі нотатки
      </h2>
      <p style={{ color: "#666", marginBottom: "24px" }}>
        Спробуйте оновити сторінку або повторити запит пізніше.
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
        Спробувати знову
      </button>
    </div>
  );
}
