import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { WishList } from '../../components/common/wishList';

import LoginButton from '@/components/common/LoginButton';
import Colors from '@/constants/Colors';
import useAuth from '@/hooks/useAuth';

export default function Wishlists() {
  const { isLogin } = useAuth();
  const { top } = useSafeAreaInsets();
  const { styles } = useStyles(styleSheet);
  const { t } = useTranslation();

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <View
        style={{
          alignItems: 'flex-end',
          paddingTop: 20
        }}
      >
        <TouchableOpacity>
          <Text style={styles.edit}>{t('wishlists.edit')}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{t('wishlists.title')}</Text>

      <WishList
        ListEmptyComponent={
          <View style={styles.empty}>
            {isLogin ? (
              <>
                <Text style={styles.emptyTitle}>{t('wishlists.createFirst')}</Text>
                <Text style={styles.emptyDesc}>{t('wishlists.createFirstDesc')}</Text>
              </>
            ) : (
              <>
                <Text style={styles.emptyTitle}>{t('wishlists.loginToView')}</Text>
                <Text style={styles.emptyDesc}>{t('wishlists.loginToViewDesc')}</Text>
                <LoginButton />
              </>
            )}
          </View>
        }
      />
    </View>
  );
}

const styleSheet = createStyleSheet(theme => ({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
    backgroundColor: '#fff'
  },
  title: {
    paddingTop: 14,
    fontSize: 28,
    fontWeight: '500',
    color: Colors.textColor,
    paddingBottom: theme.spacing.lg
  },
  edit: {
    textDecorationLine: 'underline'
  },
  empty: {
    paddingTop: 50,
    alignItems: 'flex-start'
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.textColor
  },
  emptyDesc: {
    paddingTop: 10,
    paddingBottom: 20,
    color: Colors.grey
  }
}));
