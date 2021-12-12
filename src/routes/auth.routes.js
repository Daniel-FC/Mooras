import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { colors } from '../styles';

import HomePage from '../pages/HomePage';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';

const Stack = createStackNavigator();

export default function authRoutes() {
  return (
    <Stack.Navigator initialRouteName="HomePage">
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{
          headerShown: false
        }}
      />
    <Stack.Screen 
      name="RegisterPage" 
      component={RegisterPage}
      options={{ 
        title: 'Registrar',
        headerTintColor: colors.white_standard,
        headerStyle: { backgroundColor: colors.backgroundColorHomeScreen }
      }}
    />
    <Stack.Screen 
      name="LoginPage" 
      component={LoginPage}
      options={{ 
        title: 'Entrar',
        headerTintColor: colors.white_standard,
        headerStyle: { backgroundColor: colors.backgroundColorHomeScreen }
      }}
    />
  </Stack.Navigator>
  );
}
