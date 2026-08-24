import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import GuestItem from './GuestItem';
import FilterModal from '../Modal';

import { GuestNumber } from '@/store/trip';

interface GuestModalProps {
  visible: boolean;
  onClose: () => void;
  date?: string[];
  value?: GuestNumber;
  onChange?: (guest: GuestNumber) => void;
}

const GuestModal: FC<GuestModalProps> = ({
  value = {
    adultNumber: 0,
    childrenNumber: 0,
    infantNumber: 0
  },
  visible,
  onChange,
  onClose
}) => {
  const { t } = useTranslation();
  const [guestValue, setGuestValue] = useState<GuestNumber>({
    adultNumber: 0,
    childrenNumber: 0,
    infantNumber: 0
  });

  useEffect(() => {
    setGuestValue(value);
  }, [value]);

  const handleClear = () => {
    setGuestValue({
      adultNumber: 0,
      childrenNumber: 0,
      infantNumber: 0
    });
  };

  const handleClose = () => {
    onClose();
  };

  const handleSavePress = () => {
    onChange?.(guestValue);
    handleClose();
  };

  const onChangeGuest = (value: number, type: keyof GuestNumber) => {
    setGuestValue(prev => ({
      ...prev,
      [type]: value
    }));
  };

  return (
    <FilterModal
      title={t('guest.selectGuests')}
      visible={visible}
      onClear={handleClear}
      onSave={handleSavePress}
      onClose={handleClose}
      contentStyle={styles.modalContent}
      modalStyle={{
        bottom: '28%'
      }}
    >
      <GuestItem
        title={t('guest.adults')}
        description={t('guest.adultsDesc')}
        value={guestValue.adultNumber}
        onChange={value => {
          onChangeGuest(value, 'adultNumber');
        }}
      />
      <GuestItem
        title={t('guest.children')}
        description={t('guest.childrenDesc')}
        value={guestValue.childrenNumber}
        onChange={value => {
          onChangeGuest(value, 'childrenNumber');
        }}
      />
      <GuestItem
        title={t('guest.infants')}
        description={t('guest.infantsDesc')}
        value={guestValue.infantNumber}
        onChange={value => {
          onChangeGuest(value, 'infantNumber');
        }}
      />
    </FilterModal>
  );
};

export default GuestModal;

const styles = StyleSheet.create({
  modalContent: {
    paddingHorizontal: 20
  }
});
