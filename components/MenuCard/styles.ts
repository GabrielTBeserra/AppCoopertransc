import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  BoxContainer: {
    borderRadius: 20,
    alignItems: 'center',
    margin: 25,
  },
  Box: {
    width: 110,
    height: 85,
    borderRadius: 20,
    backgroundColor: '#00433E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Title: {
    padding: 5,
    fontWeight: 'bold',
    fontSize: 15,
    color: '#00433E',
  },
  Image: {
    alignSelf: 'stretch',
    resizeMode: 'contain',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 102,
    flexDirection: 'row',
    margin: 10,
    padding: 25,
  },
});

export default styles;
