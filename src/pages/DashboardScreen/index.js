import * as React from 'react';
import { StatusBar, View, Text, TouchableOpacity} from 'react-native';

import AuthContext from '../../contexts/auth';
import styles from './styles';

export default function DashboardScreen() {
  const { user, signOut } = React.useContext(AuthContext);

  function handleSignOut() {
    signOut();
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#2D64FD' style="light-content" />

      <Text>{user.name}</Text>
      <Text>{user.email}</Text>
      <TouchableOpacity style={backgroundColor='red'} onPress={ handleSignOut }>
        <Text>Logout</Text>
      </TouchableOpacity> 

    </View>
  );
}