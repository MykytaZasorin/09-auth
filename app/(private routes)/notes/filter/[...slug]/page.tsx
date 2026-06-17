import type { Metadata } from "next";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api/serverApi";

interface TagPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const rawTag = resolvedParams.slug?.[0] || "all";
  const decodedTag = decodeURIComponent(rawTag);

  const formattedTag = decodedTag.charAt(0).toUpperCase() + decodedTag.slice(1);

  const title = `${formattedTag} Notes | NoteHub`;
  const description = `View and manage your personal notes filtered by ${decodedTag}.`;
  const url = `https://notehub.com/notes/filter/${rawTag}`;

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
          alt: `NoteHub ${formattedTag} Notes Section`,
        },
      ],
    },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const resolvedParams = await params;

  const rawTag = resolvedParams.slug?.[0] || "all";
  const decodedTag = decodeURIComponent(rawTag);

  const apiTag = decodedTag === "all" ? undefined : decodedTag;

  const INITIAL_PAGE = 1;
  const INITIAL_SEARCH = "";
  const PER_PAGE = 12;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", INITIAL_PAGE, INITIAL_SEARCH, apiTag],
    queryFn: () =>
      fetchNotes({
        page: INITIAL_PAGE,
        perPage: PER_PAGE,
        search: INITIAL_SEARCH,
        tag: apiTag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={decodedTag} />
    </HydrationBoundary>
  );
}
