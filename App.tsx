import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Routes from './routes';

import Login from './pages/Login';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Home"
      >
        <Stack.Screen
          name="Home"
          component={Login}
        />
        <Stack.Screen
          name="MenuComp"
          component={RoutesComponents}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function RoutesComponents() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
      }}
      initialRouteName="Menu"
    >

      {Routes.map((route, index) => (
        <Tab.Screen
          name={route.name}
          component={route.Component}
          key={index}
          options={route.options}
        />
      ))}
    </Tab.Navigator>
  );
}

export default App;
