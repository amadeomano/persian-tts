import { createStackNavigator, createAppContainer } from 'react-navigation';

import { primaryBlue } from './colors';
import Home from './screens/Home';

const AppNavigator = createStackNavigator(
  {
    Home,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: primaryBlue,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        flex: 1,
        fontFamily: 'shabnam',
        fontWeight: 'bold',
        textAlign: 'center',
      },
    },
  },
);

export default createAppContainer(AppNavigator);
