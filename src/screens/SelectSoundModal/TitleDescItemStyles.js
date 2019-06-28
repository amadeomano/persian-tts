import { StyleSheet } from 'react-native';
import { primaryGray } from '../../colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    padding: 15,
  },
  text: {
    color: primaryGray,
    fontSize: 16,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default styles;
