/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { PureComponent } from 'react';
import { StatusBar, Platform } from 'react-native';

import { primaryBlue } from './colors';
import Router from './Router';

export default class App extends PureComponent {
  componentDidMount() {
    StatusBar.setBarStyle('light-content');
    if (Platform.OS === 'android') StatusBar.setBackgroundColor(primaryBlue);
  }

  render() {
    return <Router />;
  }
}
