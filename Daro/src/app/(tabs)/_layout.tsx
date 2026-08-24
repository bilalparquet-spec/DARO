import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { Tabs } from 'expo-router/tabs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStyles } from 'react-native-unistyles';

import useAuth from '../../hooks/useAuth';

export default function Layout() {
  const { isLogin } = useAuth();
  const { bottom } = useSafeAreaInsets();
  const { theme } = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Tabs
        screenOptions={{
          tabBarStyle: {
            paddingBottom: bottom || 10,
            height: bottom + 54
          },
          tabBarActiveTintColor: theme.colors.primary
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: t('tabs.search'),
            tabBarIcon: ({ color, size }) => <Ionicons name="search" color={color} size={size} />
          }}
        />
        <Tabs.Screen
          name="wishlists"
          options={{
            tabBarLabel: t('tabs.wishlists'),
            headerShown: false,
            tabBarIcon: ({ color, size }) => <FontAwesome5 name="heart" color={color} size={size} />
          }}
        />
        <Tabs.Screen
          name="trips"
          options={{
            headerShown: false,
            tabBarLabel: t('tabs.trips'),
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="airbnb" color={color} size={size} />
            )
          }}
        />
        <Tabs.Screen
          name="inbox"
          options={{
            tabBarLabel: t('tabs.inbox'),
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="message-outline" color={color} size={size} />
            )
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarLabel: isLogin ? t('tabs.profile') : t('tabs.login'),
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-circle-outline" color={color} size={size} />
            )
          }}
        />
      </Tabs>
    </>
  );
}
