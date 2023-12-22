import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStateStore = create(
  persist((set, get) => ({
    user: null,
    setUser: (usr) => set(() => ({ user: usr }))
  }),
  { name: 'user' })
)
