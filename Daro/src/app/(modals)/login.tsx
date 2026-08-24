import { Ionicons } from '@expo/vector-icons';
import { useMutation } from '@tanstack/react-query';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import Button from '../../components/common/Button';
import TextInput from '../../components/common/TextInput';

import { getFontFamily } from '@/constants/Fonts';
import useAuth from '@/hooks/useAuth';
import request from '@/utils/request';

export default function Login() {
  const { styles } = useStyles(stylesheet);
  const { t, i18n } = useTranslation();
  const toast = useToast();
  const { login } = useAuth();
  const {
    control,
    handleSubmit
    // TODO:
    // formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: data => {
      return request.post('/auth/login', data);
    }
  });

  const onLogin = async (data: any) => {
    // TODO: format validation
    const res = await mutation.mutateAsync(data);
    if (res.data.success) {
      login({ ...res.data.user, token: res.data.token });
      router.back();
    } else {
      toast.show(res.data.message, {
        type: 'danger'
      });
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: t('login.title'),
          headerTitleStyle: {
            fontFamily: getFontFamily('semiBold', i18n.language)
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close-outline" size={28} />
            </TouchableOpacity>
          )
        }}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
            placeholder={t('login.email')}
            style={{ marginBottom: 30, height: 60 }}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            keyboardType="visible-password"
            secureTextEntry
            placeholder={t('login.password')}
            style={{ marginBottom: 30, height: 60 }}
          />
        )}
      />

      <Button onPress={handleSubmit(onLogin)}>{t('login.continue')}</Button>

      <View style={styles.separatorContainer}>
        <View style={styles.separator} />
        <Text style={styles.separatorText}>{t('login.or')}</Text>
        <View style={styles.separator} />
      </View>

      <Button theme="tertiary" icon={<Ionicons size={24} name="logo-google" />}>
        {t('login.google')}
      </Button>
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
  container: {
    padding: 26,
    backgroundColor: '#fff',
    flex: 1
  },
  separatorContainer: {
    flexDirection: 'row',
    marginVertical: 30,
    alignItems: 'center',
    gap: 10
  },
  separator: {
    flex: 1,
    borderBottomColor: theme.colors.border,
    // minimum width depending on the platform
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  separatorText: {
    fontSize: theme.size.sm,
    color: theme.colors.gray600
  }
}));
