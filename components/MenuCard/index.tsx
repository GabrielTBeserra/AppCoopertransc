import { FC } from 'react';
import { Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import styles from './styles';

type Props = {
  title: string;
  icon: IconProp;
};

const MenuCard: FC<Props> = ({ children, icon, title }) => (
  <View style={styles.BoxContainer}>
    <View style={styles.Box}>
      <FontAwesomeIcon icon={icon} size={35} color="white" />
    </View>
    <Text style={styles.Title}>{title}</Text>
  </View>
);

export default MenuCard;
