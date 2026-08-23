import {
  IBMPlexSansArabic_400Regular,
  IBMPlexSansArabic_500Medium,
  IBMPlexSansArabic_600SemiBold,
  IBMPlexSansArabic_700Bold
} from '@expo-google-fonts/ibm-plex-sans-arabic';
import { Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold } from '@expo-google-fonts/manrope';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { I18nManager } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ToastProvider } from 'react-native-toast-notifications';
import '../constants/unistyles';
import '../i18n';

import Toast from '@/components/common/Toast';
import { isRTL } from '@/i18n';
import { useLanguageStore } from '@/store/language';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: 6000,
      retry: false
    }
  }
});

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)'
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// تفعيل اتجاه RTL منذ إقلاع التطبيق حسب اللغة المحفوظة (العربية افتراضيًا)
const initialLanguage = useLanguageStore.getState().language;
I18nManager.allowRTL(true);
if (I18nManager.isRTL !== isRTL(initialLanguage)) {
  I18nManager.forceRTL(isRTL(initialLanguage));
}

function RootLayout() {
  const { bottom } = useSafeAreaInsets();
  const tabBarHeight = 50;
  const [loaded, error] = useFonts({
    'IBMPlexArabic-Regular': IBMPlexSansArabic_400Regular,
    'IBMPlexArabic-Medium': IBMPlexSansArabic_500Medium,
    'IBMPlexArabic-SemiBold': IBMPlexSansArabic_600SemiBold,
    'IBMPlexArabic-Bold': IBMPlexSansArabic_700Bold,
    'Manrope-Regular': Manrope_400Regular,
    'Manrope-Medium': Manrope_500Medium,
    'Manrope-SemiBold': Manrope_600SemiBold,
    'Manrope-Bold': Manrope_700Bold,
    ...FontAwesome.font
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <ToastProvider
            duration={2000}
            offsetBottom={bottom + tabBarHeight + 16}
            renderType={{
              save: options => (
                <Toast type="save" img={options.data.img} listName={options.message as string} />
              ),
              delete: options => (
                <Toast type="delete" img={options.data.img} listName={options.message as string} />
              )
            }}
          >
            <Stack />
          </ToastProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

export default RootLayout;
