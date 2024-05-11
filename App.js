import React from 'react';
import { StyleSheet, View} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Profile from './Profile';
import Form from './Form';

const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Form" component={Form} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
