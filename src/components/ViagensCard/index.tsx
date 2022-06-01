import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons/faCircleXmark';
import { faTruck } from '@fortawesome/free-solid-svg-icons/faTruck';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { View, Text } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import moment from 'moment';
import IViagens from '../../types/IViagens';

import styles from './styles';

type Props = {
  data: IViagens;
};

const ViagensCard: React.FC<Props> = ({ data }) => {
  const navigation = useNavigation();

  const dataFormatter = (dateToConvert: string) => {
    const ano = dateToConvert.substring(0, 4);
    const mes = dateToConvert.substring(5, 7);
    const dia = dateToConvert.substring(8, 10);

    return `${dia}/${mes}/${ano}`;
  };

  const differ = (d1: string, d2: string) => {
    const dif = moment(d2, 'YYYY-MM-DD').diff(moment(d1, 'YYYY-MM-DD'));
    return moment.duration(dif).asDays();
  };

  const typeOsStatus = (status: string) => {
    if (status.toLocaleLowerCase() === 'aceita') {
      return (
        <>
          <FontAwesomeIcon icon={faCheckCircle} size={20} color="green" />
          <Text style={styles.TitleText}>Aceita</Text>
        </>
      );
    }
    return (
      <>
        <FontAwesomeIcon icon={faCircleXmark} size={20} color="red" />
        <Text style={styles.TitleTextRecursed}>Recusa</Text>
      </>
    );
  };

  return (
    <View style={styles.Container}>
      <View style={styles.Title}>
        <View style={styles.TitleIcon}>{typeOsStatus(data.escolha)}</View>
        <Text style={styles.Title}>
          {data.data_marcacao ? dataFormatter(data.data_marcacao) : ''}
        </Text>
      </View>
      <View style={styles.Line}>
        <FontAwesomeIcon icon={faUser} size={20} color="#00433E" />
        <Text style={{ marginLeft: 5 }}>{data.nome}</Text>
      </View>
      <View style={styles.Line}>
        <FontAwesomeIcon icon={faTruck} size={20} color="#00433E" />
        <Text style={{ marginLeft: 5 }}>{data.descricao}</Text>
      </View>
      <View style={styles.Line}>
        <Text>
          {`${data.cidade_origem} - ${data.estado_origem}`}
          {' '}
        </Text>
        <Text>
          {`${data.cidade_destino} - ${data.estado_destino}`}
          {' '}
        </Text>
      </View>
      <View style={styles.LineWithRow}>
        <MultiSlider
          values={[0, 100]}
          min={0}
          max={100}
          step={1}
          enabledOne={false}
          enabledTwo={false}
          markerStyle={{ borderColor: 'red ' }}
          allowOverlap
          snapped
        />
        <Text style={{ marginTop: -20 }}>
          {data.distancia}
          {' '}
          Km
        </Text>
      </View>
      <View style={styles.Line}>
        <Text>Marcou em:</Text>
        <Text>{dataFormatter(data.data_marcacao)}</Text>
      </View>
      <View style={styles.Line}>
        <Text>Viajou em:</Text>
        <Text>{dataFormatter(data.data_escolha)}</Text>
      </View>
      <View style={styles.Line}>
        <Text>Diferença em dias:</Text>
        <Text>{differ(data.data_marcacao, data.data_escolha)}</Text>
      </View>
    </View>
  );
};

export default ViagensCard;
