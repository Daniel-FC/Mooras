import AsyncStorage from '@react-native-community/async-storage';
import { create } from 'apisauce';

const api = create({
  baseURL: 'http://10.0.2.2:3000',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.addAsyncRequestTransform(request => async () => {
  const token = await AsyncStorage.getItem('@CodeApi:token');

  if (token)
    request.headers['Authorization'] = `Bearer ${token}`;
});

api.addAsyncRequestTransform(response => {
  if(!response.ok) throw response;
});

export default api;
