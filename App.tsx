import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Routes from './routes';
import Login from './pages/Login';

export type RootStackParamList = {
  Home: undefined;
  MenuComp: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Home"
        >
          <Stack.Screen name="Home" component={Login} />
          <Stack.Screen name="MenuComp" component={RoutesComponents} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
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
