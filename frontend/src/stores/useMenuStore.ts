// src/store/useMenuStore.ts
import { create } from "zustand";

interface MenuState {
    selectedMenu: string;
    setSelectedMenu: (menu: string) => void;
}

const useMenuStore = create<MenuState>((set) => ({
    selectedMenu: "home", // 기본 선택 메뉴
    setSelectedMenu: (menu) => set({ selectedMenu: menu }),
}));

export default useMenuStore;
