import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

import { colors, general } from '../styles';

import DashboardScreen from '../pages/DashboardScreen';
import ClientsScreen from '../pages/ClientsScreen';
import AddSaleScreen from '../pages/AddSaleScreen';
import StockScreen from '../pages/StockScreen';
import MoreScreen from '../pages/MoreScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if(route.name=='Dashboard'){
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
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Principal' }} />
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
  );
}

const styles = StyleSheet.create({
  ...general,
});
