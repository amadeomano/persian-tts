import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList } from 'react-native';
import Modal from 'react-native-modal';

// styles & colors & configs
import voices from '../../voices.json';
import generalStyles from '../../generalStyles';
import styles from './styles';

// Components
import ColorButton from '../../components/ColorButton';
import TitleDescListItem from './TitleDescListItem';

// VoicesList
const voicesList = Object.keys(voices);

class SelectSoundModal extends PureComponent {
  state = {
    selected: '',
  };

  _onItemPress = id => this.setState({ selected: id });

  _keyExtractor = item => item;

  _renderItem = ({ item }) => (
    <TitleDescListItem
      id={item}
      onPress={this._onItemPress}
      selected={this.state.selected === item}
      title={voices[item].title}
      description={voices[item].type}
    />
  );

  _onDoneClick = () => {
    const { selected } = this.state;
    const { onDone } = this.props;
    onDone(selected);
  };

  render() {
    const { isVisible } = this.props;
    return (
      <View>
        <Modal isVisible={isVisible}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text
                style={[generalStyles.persianFonted, generalStyles.whiteText, styles.headerText]}
              >
                انتخاب صدا
              </Text>
              <ColorButton
                icon="check"
                color="transparent"
                height={50}
                width={50}
                onPress={this._onDoneClick}
              />
            </View>
            <FlatList
              data={voicesList}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

SelectSoundModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onDone: PropTypes.func.isRequired,
};

export default SelectSoundModal;
