import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import * as auth from '../services/auth';

const AuthContext = React.createContext({ signed: false, user: {} });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadStorageData() {
        const storageUser = await AsyncStorage.getItem('@RNAuth:user');
        const storageToken = await AsyncStorage.getItem('@RNAuth:token');

        if (storageUser && storageToken) {
            setUser(JSON.parse(storageUser));
            setLoading(false);
        } else if (!storageUser && !storageToken) {
            setLoading(false);
        }
    }

    loadStorageData();
  }, [])

  async function signIn() {
    const response = await auth.signIn();
    setUser(response.user);

    await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
    await AsyncStorage.setItem('@RNAuth:token', response.token);
  }

  function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
