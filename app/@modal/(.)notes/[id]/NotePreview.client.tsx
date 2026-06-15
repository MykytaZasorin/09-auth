"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import css from "./NoteDetails.module.css";

interface NoteDetailsProps {
  noteId: string;
}

export default function NotePreviewClient({ noteId }: NoteDetailsProps) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  return (
    <Modal onClose={handleClose}>
      {/* 🚀 Замість css.container використовуємо звичайний div 
          без сторонніх фонів та бордерів, щоб не дублювати вікно */}
      <div style={{ color: "inherit", minWidth: "300px" }}>
        <button
          onClick={handleClose}
          style={{
            background: "none",
            border: "none",
            color: "#0070f3",
            cursor: "pointer",
            fontSize: "1rem",
            marginBottom: "16px",
            padding: 0,
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          ← Back
        </button>

        {isLoading && (
          <p style={{ textAlign: "center", padding: "20px" }}>
            Loading, please wait...
          </p>
        )}

        {error && (
          <p style={{ color: "#dc3545", textAlign: "center", padding: "20px" }}>
            Something went wrong.
          </p>
        )}

        {note && (
          <div className={css.item}>
            <div className={css.header}>
              {/* Якщо заголовок зливається з білим фоном, 
                  можна тимчасово форсувати колір інлайном */}
              <h2 style={{ color: "#333333", marginTop: 0 }}>{note.title}</h2>
            </div>
            {note.tag && <p className={css.tag}>#{note.tag}</p>}
            <p className={css.content} style={{ color: "#555555" }}>
              {note.content}
            </p>
            <p className={css.date}>
              {new Date(note.createdAt).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}
