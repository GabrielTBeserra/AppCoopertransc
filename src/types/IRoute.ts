import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import React from 'react';

type IRoute = {
  name: string;
  Component: React.ComponentType<any>;
  options?: BottomTabNavigationOptions;
};

export default IRoute;
