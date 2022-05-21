import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons/faCircleXmark';
import { faTruck } from '@fortawesome/free-solid-svg-icons/faTruck';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { StyleSheet, View, Text } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import IViagens from '../../types/IViagens';

type Props = {
  data: IViagens
}

const MinhasViagensCard: React.FC<Props> = ({ data }) => {
  const navigation = useNavigation();

  const dataFormatter = (dateToConvert: string) => {
    const ano = dateToConvert.substring(0, 4);
    const mes = dateToConvert.substring(5, 7);
    const dia = dateToConvert.substring(8, 10);

    return `${dia}/${mes}/${ano}`;
  };

  const typeOsStatus = (status: string) => {
    if (status.toLocaleLowerCase() === 'aceita') {
      return (
        <>
          <FontAwesomeIcon
            icon={faCheckCircle}
            size={20}
            color="green"
          />
          <Text style={styles.TitleText}>
            Aceita
          </Text>

        </>
      );
    }
    return (
      <>
        <FontAwesomeIcon
          icon={faCircleXmark}
          size={20}
          color="red"
        />
        <Text style={styles.TitleTextRecursed}>
          Recusa
        </Text>

      </>
    );
  };

  return (
    <View style={styles.Container}>
      <View style={styles.Title}>
        <View style={styles.TitleIcon}>
          {typeOsStatus(data.escolha)}
        </View>
        <Text style={styles.Title}>{data.data_marcacao ? dataFormatter(data.data_marcacao) : ''}</Text>
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
        <Text>
          Marcou em:
        </Text>
        <Text>
          {dataFormatter(data.data_marcacao)}
        </Text>
      </View>
      <View style={styles.Line}>
        <Text>
          Viajou em:
        </Text>
        <Text>
          {dataFormatter(data.data_escolha)}
        </Text>
      </View>
      <View style={styles.Line}>
        <Text>
          Diferença em dias:
        </Text>
        <Text>
          6 Dia(s)
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    margin: 20,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 5,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'white',
  },
  loginButton: {
    margin: 10,
  },
  Inputs: {
    marginTop: 15,
  },
  LineWithRow: {
    marginTop: 15,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Line: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Title: {
    color: '#00433E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  TitleIcon: {
    flexDirection: 'row',
    color: 'green',
  },
  TitleText: {
    marginLeft: 5, color: '#00AC00', fontWeight: 'bold', fontSize: 14,
  },
  TitleTextRecursed: {
    marginLeft: 5, color: 'red', fontWeight: 'bold', fontSize: 14,
  },
});

export default MinhasViagensCard;
