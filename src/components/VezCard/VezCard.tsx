import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';

import * as React from 'react';
import { View, Text } from 'react-native';
import IVez from '../../types/IVez';

import styles from './styles';

type Props = {
  data: IVez;
};

const VezCard: React.FC<Props> = ({ data }) => {
  const [isClosed, setIsClosed] = React.useState(true);
  const dataFormatter = (dateToConvert: string) => {
    const ano = dateToConvert.substring(0, 4);
    const mes = dateToConvert.substring(5, 7);
    const dia = dateToConvert.substring(8, 10);

    return `${dia}/${mes}/${ano}`;
  };

  const getBoxColor = (type: string) => {
    if (type === 'CVB') {
      return styles.BoxTitleBlue;
    }
    if (type === 'CS' || type === 'CV') {
      return styles.BoxTitleYellow;
    }
    if (type === 'TS' || type === 'TB') {
      return styles.BoxTitleGreen;
    }
    return null;
  };

  const getTextColor = (type: string) => {
    if (type === 'CVB') {
      return styles.TextStyle;
    }
    if (type === 'CS' || type === 'CV') {
      return styles.TextStyleYellow;
    }
    if (type === 'TS' || type === 'TB') {
      return styles.TextStyle;
    }
    return null;
  };

  const zeroFill = (number: string, width = 3) => {
    width -= number.toString().length;
    if (width > 0) {
      return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
    }
    return `${number}`; // always return a string
  };

  return (
    <View style={styles.Container}>
      <View style={getBoxColor(data.tipo_veiculo)}>
        <View>
          <Text style={getTextColor(data.tipo_veiculo)}>
            {zeroFill(`${data.posicao}`)}
          </Text>
        </View>
        <View>
          <Text style={getTextColor(data.tipo_veiculo)}>
            {`${dataFormatter(data.data_marcacao)} ${data.hora_marcacao}`}
          </Text>
        </View>
      </View>
      <View style={styles.Content}>
        <View style={styles.Line}>
          <FontAwesomeIcon icon={faUser} size={20} color="#00433E" />
          <Text>{data.cooperado}</Text>
        </View>
        <View style={styles.Line}>
          <Text>Estados:</Text>
          <Text style={styles.TextWrap}>{data.estados}</Text>
        </View>
      </View>
    </View>
  );
};

export default VezCard;
