import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/data/dummyData';

interface RecentState {
  recentItems: Product[];
  addRecentItem: (item: Product) => void;
}

export const useRecentStore = create<RecentState>()(
  persist(
    (set) => ({
      recentItems: [],
      addRecentItem: (item) => set((state) => {
        // Remove if already exists to move it to the front
        const filtered = state.recentItems.filter((i) => i.id !== item.id);
        return {
          recentItems: [item, ...filtered].slice(0, 10), // Keep last 10
        };
      }),
    }),
    {
      name: 'recent-tools-storage',
    }
  )
);
