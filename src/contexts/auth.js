import * as React from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

const AuthContext = React.createContext({ signed: false, user: {} });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [clientList, setClientList] = React.useState([]);
  const [tagList, setTagList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadStorageData() {
        const storageUser = await AsyncStorage.getItem('@RNAuth:user');
        const storageToken = await AsyncStorage.getItem('@RNAuth:token');
        const storageClientList = await AsyncStorage.getItem('@RNAuth:clientList');
        const storageTagList = await AsyncStorage.getItem('@RNAuth:tagList');

        if (storageUser && storageToken) {
          setUser(JSON.parse(storageUser));
          setLoading(false);
          if(storageClientList){
            setClientList(JSON.parse(storageClientList));
            setTagList(JSON.parse(storageTagList));
          }
        } else if (!storageUser && !storageToken) {
            setLoading(false);
        }
    }

    loadStorageData();
  }, [])

  async function signIn(email, password) {
    email = email.toLowerCase();
    try {
      const response = await api.post('/auth/authenticate', {
        email: 'hosana@gmail.com',
        password: '7654321',
      });

      await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.data.user));
      await AsyncStorage.setItem('@RNAuth:token', response.data.token);

      setUser(response.data.user);
      Alert.alert('Logado com sucesso!', 'Bem vindo(a) ' + response.data.user.name);
      getClients();
      getTags();
    } 
    catch (err) {
      Alert.alert('Erro!', err.data.error);
    }
  }

  function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  async function getClients() {
    try {
      const response = await api.get('/clients');
      await AsyncStorage.setItem('@RNAuth:clientList', JSON.stringify(response.data.clients));
      setClientList(response.data.clients);
    } 
    catch (err) {
      console.log('Erro! ' + err.data.error);
    }
  }

  async function getTags() {
    try {
      const response = await api.get('/tags');
      await AsyncStorage.setItem('@RNAuth:tagList', JSON.stringify(response.data.tags));
      setTagList(response.data.tags);
    } 
    catch (err) {
      console.log('Erro! ' + err.data.error);
    }
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut, loading, clientList, tagList  }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
