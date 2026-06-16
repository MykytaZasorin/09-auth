// lib/api/clientApi.ts
import { api } from "./api";
import { Note } from "@/types/note";
import { User } from "@/types/user";

// Інтерфейси для відповідей та параметрів запитів
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: string;
}

export async function fetchNotes(params: {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}): Promise<FetchNotesResponse> {
  const { data } = await api.get<FetchNotesResponse>("/notes", { params });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}

export async function createNote(params: CreateNoteParams): Promise<Note> {
  const { data } = await api.post<Note>("/notes", params);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
}

// --- Функції для автентифікації та користувачів (Нові) ---

export async function register(
  params: Pick<User, "email"> & { password: string },
): Promise<User> {
  const { data } = await api.post<User>("/auth/register", params);
  return data;
}

export async function login(
  params: Pick<User, "email"> & { password: string },
): Promise<User> {
  const { data } = await api.post<User>("/auth/login", params);
  return data;
}

export async function logout(): Promise<void> {
  await api.post("/auth/logout");
}

export async function checkSession(): Promise<User | null> {
  const { data } = await api.get<User | null>("/auth/session");
  return data;
}

export async function getMe(): Promise<User> {
  const { data } = await api.get<User>("/users/me");
  return data;
}

export async function updateMe(params: Partial<User>): Promise<User> {
  const { data } = await api.patch<User>("/users/me", params);
  return data;
}
