import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity, View, Text, Platform,
} from 'react-native';

// Styles
import generalStyles from '../../generalStyles';
import styles from './styles';

const iconStyle = Platform.select({
  ios: styles.iconIos,
  android: styles.iconAndroid,
});

class ColorButton extends PureComponent {
  render() {
    const {
      icon, title, color, height, width, onPress, containerStyle,
    } = this.props;
    return (
      <TouchableOpacity onPress={onPress} style={containerStyle}>
        <View style={[styles.containerBox, { backgroundColor: color, height, width }]}>
          <Text style={[styles.icon, iconStyle]}>{icon}</Text>
          {icon.length && title.length ? <View style={styles.spacer} /> : null}
          <Text style={[generalStyles.persianFonted, styles.title]}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

ColorButton.defaultProps = {
  icon: '',
  title: '',
  onPress: undefined,
  height: 45,
  width: undefined,
  containerStyle: {},
};

ColorButton.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  color: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  height: PropTypes.number,
  width: PropTypes.number,
  containerStyle: PropTypes.object,
};

export default ColorButton;
