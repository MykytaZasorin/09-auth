import axios from "axios";
import { Note } from "@/types/note";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: string;
}

const BASE_URL = "https://notehub-public.goit.study/api";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export async function fetchNotes(params: {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}): Promise<FetchNotesResponse> {
  const { data } = await apiClient.get<FetchNotesResponse>("/notes", {
    params,
  });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await apiClient.get<Note>(`/notes/${id}`);
  return data;
}

export async function createNote(params: CreateNoteParams): Promise<Note> {
  const { data } = await apiClient.post<Note>("/notes", params);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await apiClient.delete<Note>(`/notes/${id}`);
  return data;
}
