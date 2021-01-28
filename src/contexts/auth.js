import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

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

  async function signIn(email, password) {
    email = 'rafinha@gmail.com';
    password = '1234567';
    try {
      console.log("teste1");
      const response = await api.post('/auth/authenticate', {
        email,
        password,
      });
      console.log("teste2");
      const { token, user } = response.data;

      await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(user));
      await AsyncStorage.setItem('@RNAuth:token', token);

      //setUser(response.user);
      Alert.alert('Logado com sucesso!');
    } 
    catch (err) {
      console.log(err);
      console.log(err.data);
      //this.setState({ errorMessage: err.data.error });
    }
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
