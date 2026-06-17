import type { Metadata } from "next";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./createNote.module.css";

export const metadata: Metadata = {
  title: "Create New Note | NoteHub",
  description: "Create and save a new note to your NoteHub account.",
  openGraph: {
    title: "Create New Note | NoteHub",
    description: "Create and save a new note to your NoteHub account.",
    url: "https://notehub.com/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Create Note Page Preview",
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
