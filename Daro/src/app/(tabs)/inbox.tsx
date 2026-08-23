import { Ionicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import Typography from '@ui/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import LoginButton from '@/components/common/LoginButton';
import Colors from '@/constants/Colors';
import useAuth from '@/hooks/useAuth';

export default function Inbox() {
  const { isLogin } = useAuth();
  const { top } = useSafeAreaInsets();
  const { styles } = useStyles(styleSheet);
  const { t } = useTranslation();

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <FlashList
        estimatedItemSize={10}
        ListHeaderComponent={
          <Typography variant="h1" style={styles.title}>
            {t('inbox.title')}
          </Typography>
        }
        ListEmptyComponent={
          isLogin ? (
            <View style={styles.empty}>
              <Ionicons name="chatbox-ellipses-outline" size={36} />
              <Text style={styles.emptyTitle}>{t('inbox.noMessages')}</Text>
              <Text style={styles.emptyDesc}>{t('inbox.noMessagesDesc')}</Text>
            </View>
          ) : (
            <View style={styles.emptyWithoutLogin}>
              <Text style={styles.emptyTitleWithoutLogin}>{t('inbox.loginToView')}</Text>
              <Text style={styles.emptyDescWithoutLogin}>{t('inbox.loginToViewDesc')}</Text>
              <LoginButton />
            </View>
          )
        }
        data={[]}
        renderItem={() => <Text>1</Text>}
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
    paddingTop: theme.spacing['2xl']
  },
  emptyWithoutLogin: {
    marginTop: 30,
    borderTopColor: Colors.borderColor,
    borderTopWidth: 1,
    paddingTop: 40,
    alignItems: 'flex-start'
  },
  empty: {
    paddingTop: 320,
    alignItems: 'center'
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: Colors.textColor,
    paddingBottom: 10,
    paddingTop: 16
  },
  emptyDesc: {
    fontSize: 16,
    textAlign: 'center'
  },
  emptyTitleWithoutLogin: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.textColor
  },
  emptyDescWithoutLogin: {
    paddingTop: 10,
    paddingBottom: 20,
    color: Colors.grey
  }
}));
