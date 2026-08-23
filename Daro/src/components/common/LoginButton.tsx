import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Button from './Button';

const LoginButton = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Button
      colors={['#e51e4d', '#d70465']}
      onPress={() => {
        router.navigate('/login');
      }}
    >
      {t('tabs.login')}
    </Button>
  );
};

export default LoginButton;
