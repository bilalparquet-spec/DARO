export const FONTS = {
  ar: {
    regular: 'IBMPlexArabic-Regular',
    medium: 'IBMPlexArabic-Medium',
    semiBold: 'IBMPlexArabic-SemiBold',
    bold: 'IBMPlexArabic-Bold'
  },
  latin: {
    regular: 'Manrope-Regular',
    medium: 'Manrope-Medium',
    semiBold: 'Manrope-SemiBold',
    bold: 'Manrope-Bold'
  }
} as const;

export type FontWeight = keyof typeof FONTS.ar;

/**
 * يعيد اسم عائلة الخط المناسبة حسب اللغة الحالية:
 * IBM Plex Sans Arabic للعربية، وManrope للإنجليزية والفرنسية.
 */
export const getFontFamily = (weight: FontWeight, lang: string): string => {
  const group = lang === 'ar' ? FONTS.ar : FONTS.latin;
  return group[weight];
};
