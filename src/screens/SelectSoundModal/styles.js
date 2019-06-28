import { StyleSheet } from 'react-native';
import { primaryBlue } from '../../colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingBottom: 15,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: primaryBlue,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  headerText: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 50,
  },
});

export default styles;
