import React, { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text } from 'react-native';

import Calendar, { CalendarRef } from './Calendar';
import Tabs from './Tabs';
import FilterModal from '../Modal';

function isDateSame(prev?: string[], next?: string[]) {
  if (!prev || !next) {
    return false;
  }

  if (prev.length !== next.length) {
    return false;
  }

  return prev.every((item, index) => item === next[index]);
}

interface CalendarModalProps {
  visible: boolean;
  onClose: () => void;
  date?: string[];
  onChange?: (date: string[]) => void;
}

const CalendarModal: FC<CalendarModalProps> = ({ visible, date, onClose, onChange }) => {
  const { t } = useTranslation();
  const calendarRef = useRef<CalendarRef>(null);
  const [currentTab, setCurrentTab] = useState<string>(t('calendar.shortTerm'));
  const [tempValue, setTempValue] = useState<string[]>(date || []);

  useEffect(() => {
    setTempValue(date || []);
  }, [date]);

  const handleClearDate = () => {
    calendarRef.current?.clean();
    setTempValue([]);
  };

  const handleDateChange = (date: string[]) => {
    setTempValue(date);
  };

  const handleClose = () => {
    setTempValue([]);
    onClose();
  };

  const handleSavePress = () => {
    onChange?.(tempValue);
    handleClose();
  };

  return (
    <FilterModal
      title={t('calendar.selectDate')}
      visible={visible}
      saveDisabled={tempValue.length === 1}
      clearDisabled={currentTab === t('calendar.longTerm')}
      onClear={handleClearDate}
      onSave={handleSavePress}
      onClose={handleClose}
    >
      <Tabs
        currentTab={currentTab}
        tabs={[
          {
            label: t('calendar.shortTerm'),
            children: <Calendar ref={calendarRef} date={date} onChange={handleDateChange} />
          },
          { label: t('calendar.longTerm'), children: <Text>{t('calendar.inDevelopment')}</Text> }
        ]}
        onChange={setCurrentTab}
        tabContainerStyle={styles.tabPanel}
      />
    </FilterModal>
  );
};

export default CalendarModal;

const styles = StyleSheet.create({
  tabPanel: {
    minHeight: 360
  }
});
