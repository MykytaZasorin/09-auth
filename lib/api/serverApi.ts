import { cookies } from "next/headers";
import { api } from "./api";
import { Note } from "@/types/note";
import { User } from "@/types/user";
import { FetchNotesResponse } from "./clientApi";

async function getAuthHeaders() {
  const cookieStore = await cookies();
  return {
    headers: {
      Cookie: cookieStore.toString(),
    },
  };
}

export async function fetchNotes(params: {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}): Promise<FetchNotesResponse> {
  const headers = await getAuthHeaders();
  const { data } = await api.get<FetchNotesResponse>("/notes", {
    ...headers,
    params,
  });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const headers = await getAuthHeaders();
  const { data } = await api.get<Note>(`/notes/${id}`, headers);
  return data;
}

export async function getMe(): Promise<User> {
  const headers = await getAuthHeaders();
  const { data } = await api.get<User>("/users/me", headers);
  return data;
}

export async function checkSession(): Promise<User | null> {
  const headers = await getAuthHeaders();
  const { data } = await api.get<User | null>("/auth/session", headers);
  return data;
}
