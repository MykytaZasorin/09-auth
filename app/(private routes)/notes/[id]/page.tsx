import type { Metadata } from "next";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api/serverApi";

interface Props {
  params: Promise<{ id: string }>;
}

// Асинхронна функція для генерації динамічних метаданих нотатки
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const note = await fetchNoteById(id);
    const title = `${note.title} | NoteHub`;
    // Беремо контент як опис, обрізаючи його до 150 символів для відповідності стандартам SEO
    const description =
      note.content?.slice(0, 150) || "Read this note on NoteHub.";
    const url = `https://notehub.com/notes/${id}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: `Note: ${note.title}`,
          },
        ],
      },
    };
  } catch {
    return {
      title: "Note Details | NoteHub",
      description: "View note details on NoteHub.",
    };
  }
}

export default async function NotePage({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div style={{ padding: "40px 20px", minHeight: "80vh" }}>
        <NoteDetailsClient noteId={id} />
      </div>
    </HydrationBoundary>
  );
}
