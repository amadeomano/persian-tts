import { StyleSheet } from 'react-native';
import { primaryGreen } from '../../colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#fff',
  },
  dictCountBox: {
    flexDirection: 'row-reverse',
    backgroundColor: primaryGreen,
    padding: 15,
  },
  dictCountBoxWordCount: {
    marginStart: 'auto',
  },
  tipBox: {
    backgroundColor: '#EFEFEF',
    color: '#A1A1A1',
    fontWeight: '100',
    lineHeight: 25,
    padding: 15,
  },
  input: {
    flex: 1,
    // marginVertical: 15,
    padding: 15,
    paddingTop: 15,
    textAlign: 'right',
    color: '#5F5F5F',
    lineHeight: 25,
  },
  playButtonsBox: {
    flexDirection: 'row-reverse',
  },
  playSoundButton: {
    flex: 0.4,
  },
  playButton: {
    flex: 0.6,
  },
});

export default styles;
