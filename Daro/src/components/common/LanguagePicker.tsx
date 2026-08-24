import * as Updates from 'expo-updates';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { SUPPORTED_LANGUAGES, SupportedLanguage } from '@/i18n';
import { useLanguageStore } from '@/store/language';

interface LanguagePickerProps {
  visible: boolean;
  onClose: () => void;
}

const LanguagePicker: FC<LanguagePickerProps> = ({ visible, onClose }) => {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguageStore(state => state);

  const handleSelect = async (lang: SupportedLanguage) => {
    if (lang === language) {
      onClose();
      return;
    }

    const needsReload = setLanguage(lang);
    onClose();

    if (needsReload) {
      try {
        if (Platform.OS !== 'web' && Updates.reloadAsync) {
          await Updates.reloadAsync();
        }
      } catch {
        // في بيئة التطوير قد تفشل إعادة التحميل التلقائية، يكفي إعادة فتح التطبيق يدويًا
      }
    }
  };

  return (
    <Modal onRequestClose={onClose} animationType="fade" visible={visible} transparent statusBarTranslucent>
      <Pressable style={styles.mask} onPress={onClose} />
      <View style={styles.content}>
        <Text style={styles.title}>{t('language.title')}</Text>
        {SUPPORTED_LANGUAGES.map(lang => (
          <Pressable key={lang} style={styles.item} onPress={() => handleSelect(lang)}>
            <Text style={styles.itemText}>{t(`language.${lang}`)}</Text>
            {language === lang && <Ionicons name="checkmark" size={20} color="#FF385C" />}
          </Pressable>
        ))}
      </View>
    </Modal>
  );
};

export default LanguagePicker;

const styles = StyleSheet.create({
  mask: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)',
    justifyContent: 'flex-end'
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 14,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 100,
    left: 14,
    right: 14,
    padding: 15
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    color: '#333',
    paddingBottom: 10
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#ebebeb'
  },
  itemText: {
    fontSize: 15,
    color: '#222'
  }
});
