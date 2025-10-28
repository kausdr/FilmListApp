import React from 'react';
import { View } from 'react-native';
import { Profile } from './components/ProfileScreen/Profile';
import { indexStyles } from './styles/indexStyles';

const App: React.FC = () => {
  return (
    <View style={indexStyles.outerContainer}>
      <Profile></Profile>
    </View>
  );
};

export default App;
