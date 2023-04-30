import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Stack Screens
import MainScreen from './MainScreen';
import QuizScreen from './Components/Quizzes/QuizScreen';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <SafeAreaView className="bg-white" style={{flex: 1}}>
      {/* 안드로이드 상태바 디자인 통일 */}
      <StatusBar backgroundColor={'#FFFFFF'} barStyle={'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Quiz" component={QuizScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
