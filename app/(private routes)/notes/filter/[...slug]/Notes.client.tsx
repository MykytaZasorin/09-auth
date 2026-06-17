"use client";

import css from "./Notes.client.module.css";
import { useState } from "react";
import Link from "next/link"; // Імпортуємо Link для навігації
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes, FetchNotesResponse } from "@/lib/api/clientApi";

const PER_PAGE = 12;

interface NotesClientProps {
  tag?: string | string[];
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

  const currentTagString = Array.isArray(tag) ? tag[0] : tag || "all";

  const [prevTag, setPrevTag] = useState(currentTagString);
  if (currentTagString !== prevTag) {
    setPrevTag(currentTagString);
    setPage(1);
  }

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setPage(1);
    setSearch(value);
  }, 500);

  const apiTag = currentTagString === "all" ? undefined : currentTagString;

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", page, search, apiTag],
    queryFn: () => fetchNotes({ page, perPage: PER_PAGE, search, tag: apiTag }),
    placeholderData: () =>
      queryClient.getQueryData<FetchNotesResponse>([
        "notes",
        page - 1,
        search,
        apiTag,
      ]),
  });

  return (
    <div>
      <header className={css.header}>
        <div className={css.topBar}>
          <SearchBox onChange={debouncedSearch} />
          {data && data.totalPages > 1 && (
            <Pagination
              pageCount={data.totalPages}
              currentPage={page}
              onPageChange={setPage}
            />
          )}

          <Link href="/notes/action/create" className={css.createBtn}>
            Create note +
          </Link>
        </div>
      </header>

      {isLoading && <div className={css.centeredLoading}>Loading...</div>}

      {isError && (
        <div className={css.centeredLoading}>Something went wrong</div>
      )}

      {data?.notes?.length ? (
        <NoteList notes={data.notes} />
      ) : (
        !isLoading && <div className={css.centeredLoading}>No notes found</div>
      )}
    </div>
  );
}
