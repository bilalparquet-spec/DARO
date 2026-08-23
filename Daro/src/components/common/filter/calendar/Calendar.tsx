import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar as BaseCalendar, LocaleConfig, DateData } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';

import CalendarDay, { CalendarDayProps } from './Day';

type MarkedDatesEnhanced = {
  [key: string]: CalendarDayProps['marking'];
} | null;

LocaleConfig.locales.ar = {
  monthNames: [
    'جانفي',
    'فيفري',
    'مارس',
    'أفريل',
    'ماي',
    'جوان',
    'جويلية',
    'أوت',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديسمبر'
  ],
  monthNamesShort: [
    'جانفي',
    'فيفري',
    'مارس',
    'أفريل',
    'ماي',
    'جوان',
    'جويلية',
    'أوت',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديسمبر'
  ],
  dayNames: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
  dayNamesShort: ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
  today: 'اليوم'
};

LocaleConfig.locales.en = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  today: 'Today'
};

LocaleConfig.locales.fr = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
  ],
  monthNamesShort: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
  today: "Aujourd'hui"
};

LocaleConfig.defaultLocale = 'ar';

const getRangeMarking = (startDate?: string, endDate?: string) => {
  if (!startDate || !endDate) {
    return {};
  }

  const rangeSize = dayjs(endDate).diff(startDate, 'day');
  const range: MarkedDatesEnhanced = {};
  // تحديد تاريخ البداية
  range[dayjs(startDate).format('YYYY-MM-DD')] = {
    startingDay: true
  };
  // تحديد التواريخ الوسطى
  for (let i = 0; i < rangeSize - 1; i++) {
    range[
      dayjs(startDate)
        .add(i + 1, 'day')
        .format('YYYY-MM-DD')
    ] = {
      rangeDay: true
    };
  }
  // تحديد تاريخ النهاية
  range[dayjs(startDate).add(rangeSize, 'day').format('YYYY-MM-DD')] = {
    endingDay: true
  };

  return range;
};

/**
 * إضافة التواريخ المعطّلة (disabled)
 * @param initialDate
 * @param markedDates
 * @returns
 */
const getMergedMarkedDates = (initialDate?: string, markedDates?: MarkedDatesEnhanced) => {
  const mergedMarkedDates: MarkedDatesEnhanced = { ...markedDates };
  if (dayjs(initialDate).isSame(dayjs(), 'month')) {
    const startOfMonth = dayjs().startOf('month');
    const rangeSize = dayjs(initialDate).diff(startOfMonth, 'day');
    for (let i = 0; i < rangeSize; i++) {
      mergedMarkedDates[dayjs(startOfMonth).add(i, 'day').format('YYYY-MM-DD')] = {
        disabled: true
      };
    }
  }
  return mergedMarkedDates;
};

interface CalendarProps {
  date?: string[];
  onChange?: (date: string[]) => void;
}

export interface CalendarRef {
  clean: () => void;
}

const Calendar = forwardRef<CalendarRef, CalendarProps>(({ onChange, date }, ref) => {
  const { i18n } = useTranslation();
  const [dateRange, setDateRange] = useState<MarkedDatesEnhanced>(null);
  const [disableArrowLeft, setDisableArrowLeft] = useState(false);

  useEffect(() => {
    LocaleConfig.defaultLocale = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    setDateRange(getRangeMarking(date?.[0], date?.[1]));
  }, [date]);

  useImperativeHandle(
    ref,
    () => ({
      clean() {
        setDateRange(null);
        onChange?.([]);
      }
    }),
    []
  );

  const handleDayPress = (date: DateData) => {
    // لا شيء محدد أو تم تحديد يومين، عندها نمسح التحديد السابق ونحدد الحالي
    if (!dateRange || Object.keys(dateRange).length >= 2) {
      setDateRange({
        [date.dateString]: {
          selected: true
        }
      });
      onChange?.([dayjs(date.dateString).format('YYYY-MM-DD')]);

      return;
    }

    // التاريخ المحدد قبل التاريخ المحدد سابقًا، عندها نمسح التحديد السابق ونحدد الحالي
    if (dayjs(date.dateString).isBefore(dayjs(Object.keys(dateRange)[0]))) {
      setDateRange({
        [date.dateString]: {
          selected: true
        }
      });
      onChange?.([dayjs(date.dateString).format('YYYY-MM-DD')]);

      return;
    }

    const startDate = Object.keys(dateRange)[0];
    const endDate = date.dateString;
    const range = getRangeMarking(startDate, endDate);

    onChange?.([dayjs(startDate).format('YYYY-MM-DD'), dayjs(endDate).format('YYYY-MM-DD')]);

    setDateRange({
      ...range
    });
  };

  const markedDates = getMergedMarkedDates(dayjs().format('YYYY-MM-DD'), dateRange);

  return (
    <BaseCalendar
      key={i18n.language}
      theme={{
        textSectionTitleColor: '#7d7d7d',
        selectedDayBackgroundColor: '#222222',
        dayTextColor: '#252525',
        weekVerticalMargin: 1
      }}
      monthFormat={i18n.language === 'ar' ? 'MMMM yyyy' : 'MMMM yyyy'}
      initialDate={dayjs().format('YYYY-MM-DD')}
      onMonthChange={date => {
        setDisableArrowLeft(date.month === dayjs().month() + 1);
      }}
      disableArrowLeft={disableArrowLeft}
      renderArrow={direction =>
        direction === 'left' ? (
          <Ionicons color={disableArrowLeft ? '#ccc' : '#333'} name="chevron-back" size={20} />
        ) : (
          <Ionicons color="#333" name="chevron-forward" size={20} />
        )
      }
      hideExtraDays
      dayComponent={p => <CalendarDay {...(p as CalendarDayProps)} />}
      onDayPress={handleDayPress}
      markedDates={markedDates as MarkedDates}
    />
  );
});

export default Calendar;
