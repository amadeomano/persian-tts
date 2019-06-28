import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerBox: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacer: {
    height: 10,
    width: 15,
  },
  icon: {
    color: '#fff',
    fontSize: 20,
  },
  iconIos: {
    fontFamily: 'fontawesome5freesolid',
  },
  iconAndroid: {
    fontFamily: 'font_awesome',
  },
  title: {
    color: '#fff',
    fontSize: 15,
  },
});

export default styles;
