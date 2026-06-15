"use client";

import Link from "next/link";

interface NoteDetailsErrorProps {
  error: Error;
}

export default function NoteDetailsError({ error }: NoteDetailsErrorProps) {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Oops! Something went wrong 😢</h2>
      <p>{error.message}</p>
      <Link href="/notes">
        <button style={{ marginTop: "1rem" }}>Go back to Notes</button>
      </Link>
    </div>
  );
}
