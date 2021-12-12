import React, { useContext } from 'react';

import AppLoading from 'expo-app-loading';

import AuthContext from '../contexts/auth';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

export default function Routes() {
  const { signed, loading } = useContext(AuthContext);
  
  if(loading) {
    return <AppLoading/>;
  } else {
    return signed ? <AppRoutes/> : <AuthRoutes/>;
  }
}
