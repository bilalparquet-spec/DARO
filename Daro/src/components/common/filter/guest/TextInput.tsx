import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

import GuestModal from './Modal';

import Colors from '@/constants/Colors';
import { GuestNumber, useGuestCount, useTrip } from '@/store/trip';

interface GuestInputProps {
  contentStyle?: ViewStyle;
  dateFormat?: string;
  showDuration?: boolean;
  rangeStyle?: TextStyle;
}

const GuestInput: FC<GuestInputProps> = ({ contentStyle }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const { guestNumber, setGuestNumber } = useTrip(state => state);
  const guestCount = useGuestCount();

  const hasGuest = guestCount > 0;

  const handleGuestPress = () => {
    setShowModal(true);
  };

  const handleGuestChange = (value: GuestNumber) => {
    setGuestNumber(value);
  };

  return (
    <>
      <Pressable style={contentStyle} onPress={handleGuestPress}>
        {hasGuest ? (
          <>
            {guestNumber.infantNumber > 0 ? (
              <View>
                <Text
                  style={{
                    fontSize: 10
                  }}
                >
                  {t('guest.guestsCount', { count: guestNumber.adultNumber + guestNumber.childrenNumber })}
                </Text>
                <Text
                  style={{
                    fontSize: 10
                  }}
                >
                  {t('guest.infantsCount', { count: guestNumber.infantNumber })}
                </Text>
              </View>
            ) : (
              <Text>{t('guest.guestsCount', { count: guestNumber.adultNumber + guestNumber.childrenNumber })}</Text>
            )}
          </>
        ) : (
          <Text style={styles.placeholder} numberOfLines={1}>
            {t('guest.placeholder')}
          </Text>
        )}
      </Pressable>
      <GuestModal
        value={guestNumber}
        visible={showModal}
        onClose={() => setShowModal(false)}
        onChange={handleGuestChange}
      />
    </>
  );
};

export default GuestInput;

const styles = StyleSheet.create({
  dateRange: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textColor
  },
  duration: {
    paddingLeft: 3,
    fontSize: 12,
    color: Colors.textGrey
  },
  placeholder: {
    fontSize: 14,
    color: Colors.textGrey
  }
});
