"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import css from "./NotePreview.module.css";

interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading)
    return <div className={css.loading}>Loading note details...</div>;
  if (isError || !note)
    return <div className={css.error}>Failed to load note.</div>;

  return (
    <div className={css.container}>
      <h2 className={css.title}>{note.title}</h2>
      <span className={css.tag}>Tag: {note.tag}</span>
      <p className={css.content}>{note.content}</p>
      <small className={css.date}>
        Created at: {new Date(note.createdAt).toLocaleDateString()}
      </small>
    </div>
  );
}
