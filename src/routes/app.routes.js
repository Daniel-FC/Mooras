import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

import { colors } from '../styles';

import DashboardPage from '../pages/DashboardPage';
import ClientsPage from '../pages/ClientsPage';
import NewSalePage from '../pages/NewSalePage';
import StockPage from '../pages/StockPage';
import MorePage from '../pages/MorePage';

const Tab = createBottomTabNavigator();

export default function authRoutes() {
  return (
    <Tab.Navigator initialRouteName="DashboardPage"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        if(route.name=='DashboardPage'){
          return <Ionicons name={'ios-home'} size={size} color={color}/>;
        }
        else if(route.name=='ClientsPage') {
          return <Ionicons name={'md-person'} size={size} color={color}/>;
        }
        else if(route.name=='NewSalePage') {
          return <Ionicons name={'ios-add-circle'} size={55} color={colors.blue_standard}/>;
        }
        else if(route.name=='StockPage') {
          return <FontAwesome5 name={'boxes'} size={size} color={color}/>;
        }
        else if(route.name=='MorePage'){
          return <Ionicons name={'ellipsis-horizontal-sharp'} size={35} color={color}/>;
        }
      },
    })}
      tabBarOptions={{
        activeTintColor: colors.blue_standard,
        inactiveTintColor: colors.black_standard
      }}
    >
      <Tab.Screen
        name="DashboardPage"
        component={DashboardPage}
        options={{
          title: 'Principal'
        }}
      />
      <Tab.Screen 
        name="ClientsPage" 
        component={ClientsPage}
        options={{ 
          title: 'Clientes'
        }}
      />
      <Tab.Screen 
        name="NewSalePage" 
        component={NewSalePage}
        options={{ 
          title: ''
        }}
      />
      <Tab.Screen 
        name="StockPage"
        component={StockPage}
        options={{ 
          title: 'Estoque'
        }} 
      />
      <Tab.Screen 
        name="MorePage"
        component={MorePage}
        options={{ 
          title: 'Mais'
        }} 
      />
  </Tab.Navigator>
  );
}
