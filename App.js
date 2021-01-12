import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { AppLoading } from 'expo';

import { colors, createFonts, general } from './src/styles';

import MainScreen from './src/screens/MainScreen';
import ClientsScreen from './src/screens/ClientsScreen';
import AddSaleScreen from './src/screens/AddSaleScreen';
import StockScreen from './src/screens/StockScreen';
import MoreScreen from './src/screens/MoreScreen';

import HomeScreen from './src/screens/HomeScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import RegisteredScreen from './src/screens/RegisteredScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

let isLogged = true

export default function App() {
  if(!createFonts()){
    return <AppLoading />;
  }
  else {
    if(isLogged){
      return (
        <NavigationContainer>
          <Tab.Navigator initialRouteName="Main"
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                if(route.name=='Main'){
                  return <Ionicons name={'ios-home'} size={size} color={color} />;
                }
                else if(route.name=='Clients') {
                  return <Ionicons name={'md-person'} size={size} color={color} />;
                }
                else if(route.name=='Stock') {
                  return <FontAwesome5 name={'boxes'} size={size} color={color} />;
                }
                else if(route.name=='More'){
                  return <Ionicons name={'ios-more'} size={35} color={color} />;
                }
              },
            })}
            tabBarOptions={{
            activeTintColor: colors.blue_pattern,
            inactiveTintColor: colors.black_pattern
            }}
          >
            <Tab.Screen name="Main" component={MainScreen} />
            <Tab.Screen name="Clients" component={ClientsScreen} options={{ title: 'Clientes' }} />
            <Tab.Screen name=" " component={AddSaleScreen}
              options={() => ({
                tabBarIcon: () => (
                  <View style={styles.circularButton}>
                    <Ionicons name="ios-add" size={40} color={colors.white_pattern} />
                  </View>
                ),
              })}
            />
            <Tab.Screen name="Stock" component={StockScreen} options={{ title: 'Estoque' }} />
            <Tab.Screen name="More" component={MoreScreen} options={{ title: 'Mais' }} />
          </Tab.Navigator>
        </NavigationContainer>
      );
    } 
    else {
      return (
        <NavigationContainer>
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
        </NavigationContainer>
      );
    }
  }
}

const styles = StyleSheet.create({
  ...general,
});
