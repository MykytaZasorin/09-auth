"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import css from "../../@modal/(.)notes/[id]/NoteDetails.module.css";

interface NoteDetailsProps {
  noteId: string;
}

export default function NoteDetailsClient({ noteId }: NoteDetailsProps) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  if (isLoading)
    return (
      <p style={{ textAlign: "center", marginTop: "40px" }}>
        Loading, please wait...
      </p>
    );
  if (error || !note)
    return (
      <p style={{ textAlign: "center", marginTop: "40px" }}>
        Something went wrong.
      </p>
    );

  const handleBack = () => {
    router.push("/notes/filter/all");
  };

  return (
    <div className={css.container}>
      <button type="button" onClick={handleBack} className={css.backButton}>
        Back
      </button>

      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.tag}>{note.tag}</p>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{new Date(note.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
}
