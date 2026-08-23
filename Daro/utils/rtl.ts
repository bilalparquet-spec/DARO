import { I18nManager, Platform } from 'react-native';

import { isRTL } from '@/i18n';

/**
 * يضبط اتجاه الواجهة (RTL/LTR) حسب اللغة المختارة.
 * على المنصات الأصلية (iOS/Android) يتطلب تغيير اتجاه RTL إعادة تشغيل
 * التطبيق ليصبح التخطيط الكامل متوافقًا معه، لذلك تُعيد الدالة true
 * في حال احتاج التطبيق لإعادة التحميل.
 */
export const applyRTL = (lang: string): boolean => {
  const shouldBeRTL = isRTL(lang);

  I18nManager.allowRTL(shouldBeRTL);

  if (I18nManager.isRTL !== shouldBeRTL) {
    I18nManager.forceRTL(shouldBeRTL);
    return Platform.OS !== 'web';
  }

  return false;
};
