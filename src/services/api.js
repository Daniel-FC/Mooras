import AsyncStorage from '@react-native-community/async-storage';
import { create } from 'apisauce';

const api = create({
  baseURL: 'https://api-mooras.herokuapp.com',
});

api.addAsyncRequestTransform(request => async () => {
  const token = await AsyncStorage.getItem('@RNAuth:token');

  if(token)
    request.headers['Authorization'] = `Bearer ${token}`;
});

api.addResponseTransform(response => {
  if (!response.ok) throw response;
});

export default api;
