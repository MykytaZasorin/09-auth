"use client";

import { FC } from "react";
import {
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import Link from "next/link";
import { deleteNote } from "@/lib/api";
import { Note } from "@/types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

const NoteList: FC<NoteListProps> = ({ notes }) => {
  const queryClient = useQueryClient();

  const mutation: UseMutationResult<Note, Error, string, unknown> = useMutation(
    {
      mutationFn: deleteNote,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
    },
  );

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>

            {/* 📜 ЧІТКО ЗА ТЗ: Посилання знову синє, працює як стандартний Link */}
            <Link href={`/notes/${note.id}`} className={css.viewDetails}>
              View details
            </Link>

            <button
              className={css.button}
              disabled={mutation.status === "pending"}
              onClick={() => mutation.mutate(note.id)}
            >
              {mutation.status === "pending" ? "Deleting..." : "Delete"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
