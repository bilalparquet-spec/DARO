import { Ionicons } from '@expo/vector-icons';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';

import Colors from '../../constants/Colors';

interface FilterItemProps {
  name: string;
  onPress?: () => void;
}

const FilterItem: FC<FilterItemProps> = ({ name, onPress }) => {
  const [deg, setDeg] = useState(0);

  const handlePress = () => {
    setDeg(deg === 0 ? 180 : 0);
    onPress?.();
  };

  return (
    <TouchableOpacity style={styles.item} onPress={handlePress}>
      <Text style={styles.text}>{name}</Text>
      <Animated.View
        style={[
          styles.iconContainer,
          {
            transform: [
              {
                rotate: `${deg}deg`
              }
            ]
          }
        ]}
      >
        <Ionicons name="chevron-down" style={styles.icon} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const FilterBar = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <FilterItem name={t('filterBar.guests')} />
      <View style={styles.separate} />
      <FilterItem name={t('filterBar.filters')} />
    </View>
  );
};

export default FilterBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor
  },
  item: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  separate: {
    height: '100%',
    borderLeftWidth: 1,
    borderLeftColor: Colors.borderColor
  },
  text: {
    color: Colors.textColor
  },
  iconContainer: {
    backgroundColor: '#f7f7f7',
    padding: 2,
    marginLeft: 2,
    borderRadius: 10
  },
  icon: {
    color: '#8d8d8d',
    fontSize: 10
  }
});
