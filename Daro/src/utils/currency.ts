/**
 * تنسيق الأسعار بالدينار الجزائري حسب اللغة الحالية.
 */
export const formatCurrency = (amount: number | string, lang: string): string => {
  const numericAmount = typeof amount === 'string' ? Number(amount) : amount;
  const formattedNumber = new Intl.NumberFormat(lang === 'ar' ? 'ar-DZ' : lang === 'fr' ? 'fr-DZ' : 'en-US').format(
    numericAmount || 0
  );

  if (lang === 'ar') {
    return `${formattedNumber} دج`;
  }

  if (lang === 'fr') {
    return `${formattedNumber} DA`;
  }

  return `DZD ${formattedNumber}`;
};

export const getCurrencyLabel = (lang: string): string => {
  if (lang === 'ar') return 'دج';
  if (lang === 'fr') return 'DA';
  return 'DZD';
};
