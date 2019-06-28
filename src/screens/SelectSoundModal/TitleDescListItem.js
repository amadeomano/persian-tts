import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Text } from 'react-native';

// Styles
import generalStyles from '../../generalStyles';
import styles from './TitleDescItemStyles';

class TitleDescListItem extends PureComponent {
  _onPress = () => {
    const { id, onPress } = this.props;
    onPress(id);
  };

  render() {
    const { title, description, selected } = this.props;
    const backColor = selected ? '#eee' : '#fff';
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={[styles.container, { backgroundColor: backColor }]}>
          <Text style={[generalStyles.persianFonted, styles.text, styles.boldText]}>{title}</Text>
          <Text style={[generalStyles.persianFonted, styles.text]}>{description}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

TitleDescListItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default TitleDescListItem;
