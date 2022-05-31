import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons/faUserGroup";
import { faTruck } from "@fortawesome/free-solid-svg-icons/faTruck";
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import { faVanShuttle } from '@fortawesome/free-solid-svg-icons/faVanShuttle';

import IRoute from './types/IRoute';
import Menu from './pages/Menu';
import Vez from './pages/Vez';
import Avisos from './pages/Avisos';
import Viagens from './pages/Viagens';
import MinhasViagens from './pages/MinhasViagens';

const Routes: Array<IRoute> = [
  {
    Component: Menu,
    name: 'Menu',
    options: {
      unmountOnBlur: true,
      tabBarIcon: tabInfo => (
        <FontAwesomeIcon
          icon={faHouse}
          size={20}
          color={tabInfo.focused ? '#006600' : '#8e8e93'}
        />
      ),
    },
  },
  {
    Component: Avisos,
    name: 'Avisos',
    options: {
      tabBarItemStyle: { display: 'none' },
      unmountOnBlur: true,
      tabBarIcon: tabInfo => (
        <FontAwesomeIcon
          icon={faUserGroup}
          size={20}
          color={tabInfo.focused ? '#006600' : '#8e8e93'}
        />
      ),
    },
  },
  {
    Component: Vez,
    name: 'Vez',
    options: {
      unmountOnBlur: true,
      tabBarIcon: tabInfo => (
        <FontAwesomeIcon
          icon={faUserGroup}
          size={20}
          color={tabInfo.focused ? '#006600' : '#8e8e93'}
        />
      ),
    },
  },
  {
    Component: Viagens,
    name: 'Viagens',
    options: {
      unmountOnBlur: true,
      tabBarIcon: tabInfo => (
        <FontAwesomeIcon
          icon={faTruck}
          size={20}
          color={tabInfo.focused ? '#006600' : '#8e8e93'}
        />
      ),
    },
  },
  {
    Component: MinhasViagens,
    name: 'MinhasViagens',
    options: {
      unmountOnBlur: true,
      tabBarIcon: tabInfo => (
        <FontAwesomeIcon
          icon={faVanShuttle}
          size={20}
          color={tabInfo.focused ? '#006600' : '#8e8e93'}
        />
      ),
    },
  },
];

export default Routes;
