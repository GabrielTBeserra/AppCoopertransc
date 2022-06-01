import { StyleSheet } from 'react-native';

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
    flexWrap: 'wrap',
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
    marginLeft: 5,
    color: '#00AC00',
    fontWeight: 'bold',
    fontSize: 14,
  },
  TitleTextRecursed: {
    marginLeft: 5,
    color: 'red',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default styles;
