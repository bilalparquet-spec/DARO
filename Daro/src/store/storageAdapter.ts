import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { StateStorage } from 'zustand/middleware';

// أثناء التصيير من جهة الخادم (Static Rendering على Vercel/Node.js) لا وجود
// لـ localStorage إطلاقًا. نتحقق من توفره فعليًا بدل الاعتماد فقط على Platform.OS،
// لتجنّب تعطّل عملية التصيير على الخادم بالكامل.
const isWebWithStorage = () => Platform.OS === 'web' && typeof window !== 'undefined' && !!window.localStorage;

const storageAdapter: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    if (isWebWithStorage()) return window.localStorage.getItem(name);
    if (Platform.OS === 'web') return null;

    return (await SecureStore.getItemAsync(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    if (isWebWithStorage()) return window.localStorage.setItem(name, value);
    if (Platform.OS === 'web') return;

    await SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    if (isWebWithStorage()) return window.localStorage.removeItem(name);
    if (Platform.OS === 'web') return;

    await SecureStore.deleteItemAsync(name);
  }
};

export default storageAdapter;
