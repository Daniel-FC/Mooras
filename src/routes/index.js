import * as React from 'react';

import { AppLoading } from 'expo';

import AuthContext from '../contexts/auth';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

export default function Routes() {
  const { signed, loading } = React.useContext(AuthContext);

  if(loading){
    <AppLoading />;
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
}
