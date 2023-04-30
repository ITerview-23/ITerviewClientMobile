import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

function App(): JSX.Element {
  return (
    <SafeAreaView className="bg-white" style={{flex: 1}}>
      {/* 안드로이드 상태바 디자인 통일 */}
      <StatusBar backgroundColor={'#FFFFFF'} barStyle={'dark-content'} />
      <NavigationContainer></NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
