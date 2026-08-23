import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import Colors from '../../constants/Colors';
import Button from '../common/Button';
import DateTextInput from '../common/filter/calendar/TextInput';
import GuestInput from '../common/filter/guest/TextInput';
import WilayaPicker from '../common/WilayaPicker';

import { getFontFamily } from '@/constants/Fonts';
import { Commune, Wilaya, getCommuneName, getWilayaName } from '@/data/wilayas';
import { useTrip } from '@/store/trip';

const Search = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { location, setLocation } = useTrip(state => state);
  const [pickerVisible, setPickerVisible] = useState(false);

  const handleSearch = () => {
    router.navigate('/search');
  };

  const handleSelectLocation = (wilaya: Wilaya, commune?: Commune) => {
    const label = commune
      ? `${getCommuneName(commune, i18n.language)} - ${getWilayaName(wilaya, i18n.language)}`
      : getWilayaName(wilaya, i18n.language);
    setLocation(label);
    if (commune) {
      setPickerVisible(false);
    }
  };

  return (
    <>
      <View style={styles.searchContainer}>
        <View style={styles.locationContainer}>
          <Pressable style={styles.locationLeftContainer} onPress={() => setPickerVisible(true)}>
            <Text style={[styles.location, { fontFamily: getFontFamily('bold', i18n.language) }]}>
              {location || t('common.worldwide')}
            </Text>
            <View style={styles.triangle} />
          </Pressable>
          <Pressable>
            <Text style={[styles.searchText, { fontFamily: getFontFamily('regular', i18n.language) }]}>
              {t('home.searchPlaceholder')}
            </Text>
          </Pressable>
        </View>

        <View style={styles.inputContainer}>
          <DateTextInput contentStyle={styles.time} />
          <GuestInput contentStyle={styles.guest} />
        </View>

        <Button
          style={styles.searchBtn}
          iconCenter
          onPress={handleSearch}
          icon={
            <Ionicons
              color="#fff"
              name="search"
              size={18}
              style={{
                marginRight: 4
              }}
            />
          }
        >
          {t('home.searchButton')}
        </Button>
      </View>

      <WilayaPicker
        visible={pickerVisible}
        onClose={() => setPickerVisible(false)}
        onSelect={handleSelectLocation}
      />
    </>
  );
};

export default Search;

const styles = StyleSheet.create({
  locationLeftContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingRight: 10
  },
  location: {
    fontSize: 16,
    fontWeight: '700'
  },
  triangle: {
    width: 0,
    height: 0,
    borderBottomWidth: 5,
    borderBottomColor: 'black',
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    marginLeft: 4,
    transform: [{ rotate: '135deg' }]
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 14,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor
  },
  inputContainer: {
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor
  },
  searchText: {
    fontSize: 15,
    paddingLeft: 10,
    color: Colors.textGrey,
    borderLeftWidth: 1,
    borderLeftColor: Colors.borderColor
  },
  time: {
    flex: 3
  },
  guest: {
    flex: 1,
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: Colors.borderColor
  },
  inputText: {
    fontSize: 15,
    color: Colors.textGrey
  },
  searchContainer: {
    position: 'absolute',
    left: 15,
    right: 15,
    top: 14,
    zIndex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 14,
    marginBottom: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowRadius: 4,
    shadowOpacity: 0.12,
    elevation: 6,
    shadowOffset: {
      width: 2,
      height: 2
    }
  },
  searchBtn: {
    marginTop: 14,
    width: '100%'
  }
});
