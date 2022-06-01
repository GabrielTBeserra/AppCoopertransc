import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
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
  TextStyleYellow: {
    fontWeight: 'bold',
    color: 'black',
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

export default styles;
