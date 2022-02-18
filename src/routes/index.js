import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Login,Home,Setting,AddProduct,EditProduct} from '../pages';
import {BottomNavigator} from '../component'

const Stack = createNativeStackNavigator();
const Tap = createBottomTabNavigator()

function MainApp() {
  return (
    <Tap.Navigator
    initialRouteName="Home"
    tabBar={props => <BottomNavigator{...props} />}>
      <Tap.Screen name="Home" component={Home} />
      <Tap.Screen name="Setting" component={Setting} />
    </Tap.Navigator>
  )
}

export default function Routes() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{
          headerShown:false,
        }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="MainApp" component={MainApp} />
          <Stack.Screen name="AddProduct" component={AddProduct} />
          <Stack.Screen name="EditProduct" component={EditProduct} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

