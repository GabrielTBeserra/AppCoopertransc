import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons/faAngleUp';
import { faTruck } from '@fortawesome/free-solid-svg-icons/faTruck';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown';

import * as React from 'react';
import {
  StyleSheet, View, Text, Pressable,
} from 'react-native';
import { faAlignJustify } from '@fortawesome/free-solid-svg-icons';
import IVez from '../../types/IVez';
import Card from '../Card';

type Props = {
  data: IVez
}

const VezCard: React.FC<Props> = ({ data }) => {
  const [isClosed, setIsClosed] = React.useState(true);
  const dataFormatter = (dateToConvert: string) => {
    const ano = dateToConvert.substring(0, 4);
    const mes = dateToConvert.substring(5, 7);
    const dia = dateToConvert.substring(8, 10);

    return `${dia}/${mes}/${ano}`;
  };

  const getBoxColor = (type: string) => {
    if (type.includes('CVB')) { return styles.BoxTitleBlue; }
    if (type.includes('CS') || type.includes('CV')) { return styles.BoxTitleYellow; }
    if (type.includes('TS') || type.includes('TB')) { return styles.BoxTitleGreen; }
  };

  return (
    <View style={styles.Container}>
      <View style={getBoxColor(data.veiculo)}>
        <View>
          <Text style={styles.TextStyle}>001</Text>
        </View>
        <View>
          <Text style={styles.TextStyle}>{`${dataFormatter(data.data_marcacao)} ${data.hora_marcacao}`}</Text>
        </View>
      </View>
      <View style={styles.Content}>

        <View style={styles.Line}>
          <FontAwesomeIcon
            icon={faUser}
            size={20}
            color="#00433E"
          />
          <Text>
            {data.cooperado}
          </Text>
        </View>
        <View style={styles.Line}>
          <Text>
            Marcou vez na:
          </Text>
          <Text>
            {data.unidade}
          </Text>
        </View>
        <View style={styles.Line}>
          <Text>
            Estados:
          </Text>
          <Text style={styles.TextWrap}>
            {data.estados}
          </Text>
        </View>
        {!isClosed && (
          <>
            <View style={{
              borderColor: 'black', borderWidth: 0.3, marginTop: 15, marginBottom: 10,
            }}
            />
            <View style={styles.Line}>
              <FontAwesomeIcon
                icon={faTruck}
                size={20}
                color="#00433E"
              />
              <Text style={styles.TextWrap}>
                {data.veiculo}
              </Text>
            </View>
            <View style={styles.Line}>
              <Text>
                Engatada com:
              </Text>
              <Text style={styles.TextWrap}>
                {data.Engatado}
              </Text>
            </View>
            <View style={styles.Line}>
              <Text>
                Data Chegada:
              </Text>
              <Text>
                {data.chegada}
              </Text>
            </View>
          </>
        )}
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
          <Pressable onPress={() => setIsClosed(!isClosed)}>
            <FontAwesomeIcon
              icon={isClosed ? faAngleDown : faAngleUp}
              size={20}
              color="#00433E"
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    margin: 20,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  Content: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
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
  TextStyle: {
    fontWeight: 'bold',
    color: 'white',
  },
  TitleText: {
    marginLeft: 5, color: '#00AC00', fontWeight: 'bold', fontSize: 14,
  },
  TitleTextRecursed: {
    marginLeft: 5, color: 'red', fontWeight: 'bold', fontSize: 14,
  },
  BoxTitleBlue: {
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    backgroundColor: '#5F95F0',
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'space-between',
  },
  BoxTitleGreen: {
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    backgroundColor: '#00AC00',
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'space-between',
  },
  BoxTitleYellow: {
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    backgroundColor: '#FFF000',
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'space-between',
  },
  TextWrap: {
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 35,
  },
});

export default VezCard;
