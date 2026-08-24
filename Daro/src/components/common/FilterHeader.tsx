import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { I18nManager, StyleSheet, Text, View, ViewStyle, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import DateTextInput from './filter/calendar/TextInput';
import Colors from '../../constants/Colors';

import { getFontFamily } from '@/constants/Fonts';
import { useTrip } from '@/store/trip';

interface FilterHeaderProps {
  showBack?: boolean;
  style?: ViewStyle;
  hasShadow?: boolean;
}

const FilterHeader: FC<FilterHeaderProps> = ({ style, showBack, hasShadow }) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { location } = useTrip(state => state);

  return (
    <Animated.View
      style={[
        styles.container,
        style,
        { paddingTop: insets.top + 10 },
        hasShadow ? styles.shadow : null
      ]}
    >
      {showBack && (
        <TouchableOpacity style={styles.back} onPress={() => router.back()}>
          <Ionicons name={I18nManager.isRTL ? 'chevron-forward' : 'chevron-back'} size={20} />
        </TouchableOpacity>
      )}

      <View style={styles.content}>
        <View style={{ width: 45, paddingVertical: 3 }}>
          <Text style={{ color: '#333', fontWeight: '700' }} numberOfLines={1}>
            {location || t('common.worldwide')}
          </Text>
        </View>
        <View style={[styles.filterItem, { flex: 3 }]}>
          <DateTextInput
            dateFormat="MM/DD"
            showDuration={false}
            rangeStyle={{
              color: Colors.textColor,
              fontSize: 13,
              fontWeight: '500'
            }}
          />
        </View>
        <View style={[styles.filterItem, { flex: 2 }]}>
          <Text
            style={{ color: '#707070', fontWeight: '500', fontFamily: getFontFamily('regular', i18n.language) }}
            numberOfLines={1}
          >
            {t('filterHeader.placeholder')}
          </Text>
        </View>
        <TouchableOpacity style={{ width: 20, paddingVertical: 3 }}>
          <Ionicons name="search" size={18} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default FilterHeader;

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#f7f7f7',
    flexDirection: 'row',
    padding: 12,
    borderRadius: 10,
    alignContent: 'center',
    flex: 1
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 18,
    backgroundColor: '#fff'
  },
  shadow: {
    shadowColor: '#000',
    shadowRadius: 4,
    shadowOpacity: 0.12,
    elevation: 6,
    shadowOffset: {
      width: 2,
      height: 2
    }
  },
  back: {
    paddingRight: 10
  },
  filterItem: {
    borderLeftWidth: 1,
    borderLeftColor: Colors.borderColor,
    paddingHorizontal: 10,
    paddingVertical: 3
  }
});
