import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import storageAdapter from './storageAdapter';

import i18n, { DEFAULT_LANGUAGE, SupportedLanguage } from '@/i18n';
import { applyRTL } from '@/utils/rtl';

interface LanguageState {
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => boolean;
}

export const useLanguageStore = create(
  persist<LanguageState>(
    set => ({
      language: DEFAULT_LANGUAGE,
      setLanguage: (language: SupportedLanguage) => {
        i18n.changeLanguage(language);
        const needsReload = applyRTL(language);
        set({ language });
        return needsReload;
      }
    }),
    {
      name: 'language-storage',
      storage: createJSONStorage(() => storageAdapter)
    }
  )
);
