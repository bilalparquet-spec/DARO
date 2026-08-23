import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import { Listing } from '../../interface/Listing';

import Colors from '@/constants/Colors';

function Feature({ text, type = 'standard' }: { text: string; type?: 'primary' | 'standard' }) {
  return (
    <View style={styles[type]}>
      <Text style={styles[`${type}Text`]}>{text}</Text>
    </View>
  );
}

const Features = ({ item }: { item: Listing }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Feature type="primary" text={t('features.superhost')} />
      <Feature type="primary" text={t('features.nearMetro')} />
      <Feature text={t('features.freeParking')} />
      <Feature text={t('features.kitchen')} />
      <Feature text={t('features.selfCheckIn')} />
      <Feature text={t('features.heating')} />
    </View>
  );
};

export default Features;

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    paddingVertical: 6,
    flexDirection: 'row',
    gap: 6
  },
  primary: {
    backgroundColor: '#f5eee6',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 6
  },
  primaryText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#b25520'
  },
  standard: {
    backgroundColor: '#f7f7f7',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 6
  },
  standardText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: Colors.textColor
  }
});
