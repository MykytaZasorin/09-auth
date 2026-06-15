import { create } from "zustand";
import { persist } from "zustand/middleware";

// Описуємо інтерфейс для структури чернетки
interface DraftNote {
  title: string;
  content: string;
  tag: string;
}

// Описуємо інтерфейс самого Zustand-стору
interface NoteStore {
  draft: DraftNote;
  setDraft: (note: Partial<DraftNote>) => void;
  clearDraft: () => void;
}

const initialDraft: DraftNote = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,

      setDraft: (updatedFields) =>
        set((state) => ({
          draft: { ...state.draft, ...updatedFields },
        })),

      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "notehub-draft-storage",
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);
