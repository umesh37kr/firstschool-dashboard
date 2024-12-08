import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface TokenState {
  token: string;
  setToken: (data: string) => void;
}

const useTokenStore = create<TokenState>()(
  devtools(
    persist(
      (set) => ({
        token: "",
        setToken: (data: string) => set(() => ({ token: data })),
      }),
      {
        name: "token-store",
      }
    )
  )
);

export default useTokenStore;
