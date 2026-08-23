import { AntDesign, Ionicons, Octicons } from '@expo/vector-icons';
import Typography from '@ui/Typography';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { UnistylesRuntime, createStyleSheet, useStyles } from 'react-native-unistyles';

import Button from '../../components/common/Button';
import { MenuItem, MenuList } from '../../components/common/menu';

import Avatar from '@/components/common/Avatar';
import LanguagePicker from '@/components/common/LanguagePicker';
import Colors from '@/constants/Colors';
import useAuth from '@/hooks/useAuth';

const Profile = () => {
  const { isLogin, user, logout } = useAuth();
  const { styles, theme } = useStyles(styleSheet);
  const router = useRouter();
  const { t } = useTranslation();
  const [languagePickerVisible, setLanguagePickerVisible] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.scrollContainer, { paddingTop: theme.spacing['2xl'] }]}
        contentContainerStyle={{ paddingBottom: theme.spacing['3xl'] }}
      >
        {isLogin ? (
          <View style={styles.header}>
            <Typography variant="h1">{t('profile.title')}</Typography>
            <Pressable>
              <Ionicons size={24} color="#4b4646" name="notifications-outline" />
            </Pressable>
          </View>
        ) : (
          <>
            <Typography variant="h1" style={styles.title}>
              {t('profile.guestTitle')}
            </Typography>
            <Typography variant="subtitle">{t('profile.guestSubtitle')}</Typography>
            <Button onPress={() => router.push('/(modals)/login')} style={styles.btn}>
              {t('profile.login')}
            </Button>
            <View style={styles.registerWrap}>
              <Text style={styles.registerText}>{t('profile.noAccount')}</Text>
              <Link style={styles.registerLink} href="/(modals)/login">
                {t('profile.register')}
              </Link>
            </View>
          </>
        )}

        {isLogin ? (
          <>
            <MenuItem
              href=""
              name={user?.name || ''}
              desc={t('profile.showProfile')}
              icon={<Avatar img={user?.img as string} />}
            />
            <MenuList
              title={t('profile.settings')}
              options={[
                {
                  name: t('profile.personalInfo'),
                  icon: <Octicons size={24} name="person" />,
                  href: '/(modals)/profile'
                },
                {
                  name: t('profile.loginSecurity'),
                  icon: <AntDesign size={24} name="Safety" />,
                  href: '/(modals)/profile'
                },
                {
                  name: t('profile.paymentsPayouts'),
                  icon: <AntDesign size={24} name="creditcard" />,
                  href: '/(modals)/profile'
                },
                {
                  name: t('profile.notifications'),
                  icon: <Ionicons size={24} name="notifications-outline" />,
                  href: '/(modals)/profile'
                },
                {
                  name: t('profile.language'),
                  icon: <Ionicons size={24} name="language-outline" />,
                  href: '',
                  onPress: () => setLanguagePickerVisible(true)
                }
              ]}
            />

            <MenuList
              title={t('profile.about')}
              options={[
                {
                  name: t('profile.projectLink'),
                  icon: <Octicons color={Colors.textColor} size={20} name="mark-github" />,
                  href: 'https://github.com/3Alan/airbnb-clone',
                  isWebLink: true
                }
              ]}
            />
            <TouchableOpacity onPress={logout}>
              <Text style={styles.logout}>{t('profile.logout')}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <MenuList
            options={[
              {
                name: t('profile.settings'),
                icon: <Ionicons size={20} color="#4b4646" name="settings-outline" />,
                href: '/(modals)/profile'
              },
              {
                name: t('profile.language'),
                icon: <Ionicons size={20} color="#4b4646" name="language-outline" />,
                href: '',
                onPress: () => setLanguagePickerVisible(true)
              },
              {
                name: t('profile.projectLink'),
                icon: <Octicons color={Colors.textColor} size={20} name="mark-github" />,
                href: 'https://github.com/3Alan/airbnb-clone',
                isWebLink: true
              }
            ]}
          />
        )}
      </ScrollView>

      <LanguagePicker visible={languagePickerVisible} onClose={() => setLanguagePickerVisible(false)} />
    </View>
  );
};

export default Profile;

const styleSheet = createStyleSheet(theme => ({
  logout: {
    textDecorationLine: 'underline',
    paddingVertical: theme.spacing.md
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: UnistylesRuntime.insets.top
  },
  scrollContainer: {
    paddingHorizontal: 20
  },
  title: {
    paddingBottom: theme.spacing.sm
  },
  btn: {
    marginTop: theme.spacing['3xl']
  },
  registerWrap: {
    flexDirection: 'row',
    marginTop: theme.spacing.md,
    fontSize: theme.size.xs
  },
  registerText: {
    fontSize: theme.size.xs,
    paddingBottom: theme.spacing['2xl']
  },
  registerLink: {
    fontSize: theme.size.xs,
    textDecorationLine: 'underline',
    fontWeight: '500'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: theme.spacing.sm
  },
  iconItem: {
    alignItems: 'center'
  }
}));
