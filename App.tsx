import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CodePush from 'react-native-code-push';

// Stack Screens
import MainScreen from './MainScreen';
import QuizScreen from './Components/Quizzes/QuizScreen';
import QuizDailyScreen from './Components/Quizzes/QuizDailyScreen';
import ReportScreen from './Components/Reports/ReportScreen';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <SafeAreaView className="bg-white" style={{flex: 1}}>
      {/* 안드로이드 상태바 디자인 통일 */}
      <StatusBar backgroundColor={'#FFFFFF'} barStyle={'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="QuizDaily" component={QuizDailyScreen} />
          <Stack.Screen name="Quiz" component={QuizScreen} />
          <Stack.Screen name="Report" component={ReportScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default CodePush(App);
