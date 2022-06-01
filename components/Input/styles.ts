import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  Container: {
    padding: 10,
  },
  Input: {
    alignSelf: 'stretch',
    padding: 10,
    fontSize: 22,
    width: '90%',
  },

  Label: {
    marginBottom: 10,
    color: '#00433E',
    fontWeight: 'bold',
  },
  InputFull: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#00433E',
  },
  InputInvalid: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'red',
  },
});

export default styles;
