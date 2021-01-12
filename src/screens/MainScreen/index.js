import * as React from 'react';
import { View, Text, StatusBar } from 'react-native';

import styles from './styles';

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#2D64FD' style="light-content" />
      <Text>Main Screen</Text>
    </View>
  );
}
