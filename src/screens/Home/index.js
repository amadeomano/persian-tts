import React, { PureComponent } from 'react';
import {
  Text, View, TextInput, SafeAreaView, Platform,
} from 'react-native';
import { RNFFmpeg } from 'react-native-ffmpeg';
import * as RNFS from 'react-native-fs';
import Sound from 'react-native-sound';

// Styling & Strings & colors
import generalStyles from '../../generalStyles';
import strings from './strings';
import styles from './styles';
import { primaryRed, primaryGray } from '../../colors';
import voices from '../../voices.json';

// Components
import ColorButton from '../../components/ColorButton';
import SelectSoundModal from '../SelectSoundModal';

// Utils
import textToPhonems from '../../utils/TextToPhonems';
import phonemsToFFMpeg from '../../utils/PhonemsToFFMpeg';

const rightAlignedStyle = Platform.select({
  ios: generalStyles.iPhoneRightText,
  android: generalStyles.androidRightAlign,
});

export default class Home extends PureComponent {
  state = {
    text: '',
    selectedVoice: '',
    isVoiceModalShown: false,
  };

  handleTextInput = text => this.setState({ text });

  handleButtonClick = async () => {
    const { text, selectedVoice } = this.state;
    const phonems = textToPhonems(text);
    const ffmpeg = await phonemsToFFMpeg(phonems, RNFS.CachesDirectoryPath, selectedVoice);
    // console.log(ffmpeg);
    /* const result = */ await RNFFmpeg.execute(ffmpeg, ' ');
    // console.log(result);
    // if (result.rc !== 0) {
    //   const lastOutput = await RNFFmpeg.getLastCommandOutput();
    //   console.log(lastOutput);
    // }

    // Play the sound
    Sound.setCategory('Playback');
    const outputSound = new Sound(`${RNFS.CachesDirectoryPath}/output.wav`, '', (err) => {
      if (err) {
        // console.log('Failed to load output.wav to play');
        return;
      }

      outputSound.play();
    });
  };

  _showSoundModal = () => this.setState({ isVoiceModalShown: true });

  _onSoundModalDone = id => this.setState({ selectedVoice: id, isVoiceModalShown: false });

  render() {
    const { selectedVoice, isVoiceModalShown } = this.state;
    return (
      <View style={styles.container}>
        <SelectSoundModal isVisible={isVoiceModalShown} onDone={this._onSoundModalDone} />
        <View style={styles.dictCountBox}>
          <Text style={[generalStyles.persianFonted, generalStyles.whiteText]}>
            {strings.dictBoxTitle}
          </Text>
          <Text
            style={[
              generalStyles.persianFonted,
              generalStyles.whiteText,
              styles.dictCountBoxWordCount,
            ]}
          >
            {`0 ${strings.dictBoxCountSuffix}`}
          </Text>
        </View>
        <Text
          style={[generalStyles.rtl, generalStyles.persianFonted, rightAlignedStyle, styles.tipBox]}
        >
          {strings.tipBoxText}
        </Text>
        <TextInput
          style={[generalStyles.persianFonted, generalStyles.rtl, styles.input]}
          underlineColorAndroid="transparent"
          placeholder="متن مورد نظر را بنویسید"
          placeholderTextColor="#ccc"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={this.handleTextInput}
          textAlignVertical="top"
          multiline
          returnKeyType="done"
          blurOnSubmit
        />
        <View style={styles.playButtonsBox}>
          <ColorButton
            containerStyle={styles.playSoundButton}
            title={voices[selectedVoice].title}
            icon="volume-up"
            color="#CE5747"
            onPress={this._showSoundModal}
          />
          <ColorButton
            containerStyle={styles.playButton}
            title="تبدیل متن به گفتار"
            color={primaryRed}
            onPress={this.handleButtonClick}
          />
        </View>
        <SafeAreaView style={{ backgroundColor: primaryGray }}>
          <ColorButton title="تصحیح سریع تلفظ لغات" color={primaryGray} />
        </SafeAreaView>
      </View>
    );
  }
}

Home.navigationOptions = {
  title: 'تبدیل متن به صوت',
};
