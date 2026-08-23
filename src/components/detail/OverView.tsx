import { Ionicons } from '@expo/vector-icons';
import { Listing } from '@prisma/client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '../../constants/Colors';

import { getFontFamily } from '@/constants/Fonts';

function OverviewItem({ name, text }: { name: any; text: string }) {
  return (
    <View style={styles.overviewItem}>
      <Ionicons color={Colors.textColor} name={name} size={26} />
      <Text style={styles.overviewText}>{text}</Text>
    </View>
  );
}

const OverView = ({ item }: { item: Listing }) => {
  const { t, i18n } = useTranslation();

  return (
    <View style={styles.overviewContainer}>
      <Text style={styles.title}>{t('detail.overview')}</Text>
      <View style={styles.overview}>
        <OverviewItem name="home-outline" text={t('detail.bedrooms', { count: item.roomCount })} />
        <OverviewItem name="bed-outline" text={t('detail.beds', { count: item.bedCount })} />
        <OverviewItem name="home-outline" text={t('detail.bathrooms', { count: item.bathRoomCount })} />
        <OverviewItem name="people-outline" text={t('detail.guestsCapacity', { count: item.guestCount })} />
      </View>

      {item.description && (
        <>
          <Text style={styles.title}>{t('detail.description')}</Text>
          <Text style={[styles.summary, { fontFamily: getFontFamily('regular', i18n.language) }]}>
            {item.description}
          </Text>
        </>
      )}
    </View>
  );
};

export default OverView;

const styles = StyleSheet.create({
  overviewContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 12
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    paddingBottom: 10,
    color: Colors.textColor
  },
  overview: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 24,
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#fafafa'
  },
  overviewItem: {
    flex: 1,
    alignItems: 'center'
  },
  overviewText: {
    paddingTop: 6,
    fontSize: 12,
    fontWeight: '800',
    color: Colors.textColor
  },
  summary: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.textColor,
    paddingBottom: 20
  }
});
