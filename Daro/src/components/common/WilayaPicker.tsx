import { Ionicons } from '@expo/vector-icons';
import React, { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Colors from '@/constants/Colors';
import { getFontFamily } from '@/constants/Fonts';
import { Commune, Wilaya, WILAYAS, getCommuneName, getWilayaName } from '@/data/wilayas';

interface WilayaPickerProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (wilaya: Wilaya, commune?: Commune) => void;
}

const WilayaPicker: FC<WilayaPickerProps> = ({ visible, onClose, onSelect }) => {
  const { t, i18n } = useTranslation();
  const { top, bottom } = useSafeAreaInsets();
  const [selectedWilaya, setSelectedWilaya] = useState<Wilaya | null>(null);
  const [query, setQuery] = useState('');

  const fontFamily = getFontFamily('regular', i18n.language);
  const fontFamilySemiBold = getFontFamily('semiBold', i18n.language);

  const filteredWilayas = useMemo(() => {
    if (!query) return WILAYAS;
    return WILAYAS.filter(w => getWilayaName(w, i18n.language).includes(query) || w.code.includes(query));
  }, [query, i18n.language]);

  const filteredCommunes = useMemo(() => {
    if (!selectedWilaya) return [];
    if (!query) return selectedWilaya.communes;
    return selectedWilaya.communes.filter(c => getCommuneName(c, i18n.language).includes(query));
  }, [selectedWilaya, query, i18n.language]);

  const handleClose = () => {
    setSelectedWilaya(null);
    setQuery('');
    onClose();
  };

  const handleWilayaPress = (wilaya: Wilaya) => {
    setSelectedWilaya(wilaya);
    setQuery('');
    onSelect(wilaya);
  };

  const handleCommunePress = (commune: Commune) => {
    if (!selectedWilaya) return;
    onSelect(selectedWilaya, commune);
    handleClose();
  };

  const handleBack = () => {
    setSelectedWilaya(null);
    setQuery('');
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={handleClose} statusBarTranslucent>
      <View style={[styles.container, { paddingTop: top + 10, paddingBottom: bottom }]}>
        <View style={styles.header}>
          {selectedWilaya ? (
            <Pressable style={styles.headerBtn} onPress={handleBack}>
              <Ionicons name="chevron-back" size={22} color={Colors.textColor} />
            </Pressable>
          ) : (
            <View style={styles.headerBtn} />
          )}
          <Text style={[styles.headerTitle, { fontFamily: fontFamilySemiBold }]}>
            {selectedWilaya ? getWilayaName(selectedWilaya, i18n.language) : t('common.chooseWilaya')}
          </Text>
          <Pressable style={styles.headerBtn} onPress={handleClose}>
            <Ionicons name="close" size={22} color={Colors.textColor} />
          </Pressable>
        </View>

        <View style={styles.searchBox}>
          <Ionicons name="search" size={16} color="#8d8d8d" />
          <TextInput
            style={[styles.searchInput, { fontFamily }]}
            value={query}
            onChangeText={setQuery}
            placeholder={selectedWilaya ? t('common.searchCommune') : t('common.searchWilaya')}
            placeholderTextColor="#8d8d8d"
          />
        </View>

        {selectedWilaya ? (
          <FlatList
            data={filteredCommunes}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Pressable style={styles.row} onPress={() => handleCommunePress(item)}>
                <Text style={[styles.rowText, { fontFamily }]}>{getCommuneName(item, i18n.language)}</Text>
              </Pressable>
            )}
          />
        ) : (
          <FlatList
            data={filteredWilayas}
            keyExtractor={item => item.code}
            renderItem={({ item }) => (
              <Pressable style={styles.row} onPress={() => handleWilayaPress(item)}>
                <Text style={styles.rowCode}>{item.code}</Text>
                <Text style={[styles.rowText, { fontFamily }]}>{getWilayaName(item, i18n.language)}</Text>
              </Pressable>
            )}
          />
        )}
      </View>
    </Modal>
  );
};

export default WilayaPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 10
  },
  headerBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    fontSize: 16,
    color: Colors.textColor
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 14,
    marginBottom: 10,
    paddingHorizontal: 12,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#f7f7f7',
    gap: 8
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.textColor
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2'
  },
  rowCode: {
    fontSize: 12,
    color: '#b4b4b4',
    width: 24
  },
  rowText: {
    fontSize: 15,
    color: Colors.textColor
  }
});
