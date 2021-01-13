import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { colors } from '../styles';

import HomeScreen from '../pages/HomeScreen';
import RegisterScreen from '../pages/RegisterScreen';
import RegisteredScreen from '../pages/RegisteredScreen';

const Stack = createStackNavigator();

export default function authRoutes() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen} 
        options={{ 
          title: 'Cadastrar', 
          headerTintColor: colors.white_pattern, 
          headerStyle: { backgroundColor: colors.backgroundColorHomeScreen }
        }}
      />
      <Stack.Screen 
        name="Registered" 
        component={RegisteredScreen}
        options={{ 
          title: 'Entrar', 
          headerTintColor: colors.white_pattern, 
          headerStyle: { backgroundColor: colors.backgroundColorHomeScreen } 
        }}
      />
    </Stack.Navigator>
  );
}