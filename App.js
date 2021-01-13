import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AppLoading } from 'expo';

import { AuthProvider } from './src/contexts/auth';
import Routes from './src/routes';
import { createFonts } from './src/styles';

export default function App() {
  if(!createFonts()){
    return <AppLoading />;
  }
  else {
    return (
      <NavigationContainer>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </NavigationContainer>
    );
  }
}
