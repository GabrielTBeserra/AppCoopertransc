import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons/faLocationDot';
import { faBox } from '@fortawesome/free-solid-svg-icons/faBox';
import { faTicketSimple } from '@fortawesome/free-solid-svg-icons/faTicketSimple';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons/faTriangleExclamation';
import { faMapLocation } from '@fortawesome/free-solid-svg-icons/faMapLocation';

import IMenuRoute from '../../types/IMenuRoute';

const Routes: Array<IMenuRoute> = [
  {
    name: 'Avisos',
    icon: faTriangleExclamation,
    navigateTo: 'Avisos',
  },
  {
    name: 'Minhas Viagens',
    icon: faLocationDot,
    navigateTo: 'MinhasViagens',
  },
  {
    name: 'Vez',
    icon: faUsers,
    navigateTo: 'Vez',
  },
  {
    name: 'Viagens',
    icon: faMapLocation,
    navigateTo: 'Viagens',
  },
  {
    name: 'Arquivos',
    icon: faMapLocation,
    navigateTo: 'Arquivos',
  },
];

export default Routes;
