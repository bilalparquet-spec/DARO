import { Image } from 'expo-image';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface ToastProps {
  img: string;
  listName?: string;
  type?: 'save' | 'delete';
}

const Toast: FC<ToastProps> = ({ img, listName, type }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Image contentFit="cover" source={{ uri: img }} style={styles.img} />

      {type === 'save' && (
        <Text style={styles.text} numberOfLines={2}>
          {t('toast.savedTo', { name: listName })}
        </Text>
      )}
      {type === 'delete' && (
        <Text style={styles.text}>{t('toast.removedFrom', { name: listName })}</Text>
      )}

      {type === 'save' && (
        <Pressable>
          <Text style={styles.change}>{t('toast.change')}</Text>
        </Pressable>
      )}
    </View>
  );
};

export default Toast;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
    borderRadius: 10,
    marginHorizontal: 20,
    padding: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowRadius: 4,
    shadowOpacity: 0.12,
    elevation: 6,
    shadowOffset: {
      width: 2,
      height: 2
    }
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 14
  },
  text: {
    fontWeight: '500',
    fontSize: 14,
    flex: 1
  },
  change: {
    textDecorationLine: 'underline',
    paddingHorizontal: 6
  }
});
