import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { isEmpty } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '../../constants/Colors';
import Button from '../common/Button';

import { Listing } from '@/interface/Listing';
import { useGuestCount, useTrip } from '@/store/trip';
import authAction from '@/utils/authAction';
import { formatCurrency } from '@/utils/currency';

const DetailFooter = ({ item, isLoading }: { item: Listing; isLoading?: boolean }) => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { dateRange } = useTrip(state => state);
  const guestCount = useGuestCount();

  const handleReservePress = async () => {
    router.push<any>({
      pathname: '/reservation',
      params: {
        listingId: item.id,
        startDate: dateRange[0],
        endDate: dateRange[1],
        guestCount
      }
    });
  };

  return (
    <View style={styles.footer}>
      <View>
        {!isLoading && (
          <>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>{formatCurrency(item.price, i18n.language)}</Text>
              <Text style={styles.priceUnit}>/{t('common.night')}</Text>
            </View>
            <View style={styles.reviewContainer}>
              <Ionicons color="#fd3b5e" name="star" size={12} />
              <Text style={styles.reviewRate}>{item.rating}</Text>
              <Text style={styles.reviewNumber}>{t('listingCard.reviewsCount', { count: item.reviewCount })}</Text>
            </View>
          </>
        )}
      </View>

      {isEmpty(dateRange) ? (
        <Button isLoading={isLoading}>{t('detail.checkAvailability')}</Button>
      ) : (
        <Button
          style={{
            width: 100
          }}
          isLoading={isLoading}
          onPress={authAction(handleReservePress)}
        >
          {t('detail.reserve')}
        </Button>
      )}
    </View>
  );
};

export default DetailFooter;

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    height: 90,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e4e4e4'
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textColor
  },
  priceUnit: {
    color: '#b4b4b4',
    fontSize: 12
  },
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4
  },
  reviewRate: {
    paddingLeft: 2,
    color: Colors.textColor,
    fontSize: 12,
    fontWeight: 'bold'
  },
  reviewNumber: {
    fontSize: 12,
    color: Colors.textGrey,
    fontWeight: '500'
  }
});
