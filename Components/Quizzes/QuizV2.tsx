import React, {useEffect} from 'react';
import {View, TextInput, Text, ScrollView} from 'react-native';

const QuizV2 = ({quiz, changeQuizInputByIndex}: any): JSX.Element => {
  useEffect(() => {}, [quiz]);

  return (
    <View style={{height: 200}}>
      <ScrollView>
        <View className="flex flex-row flex-wrap items-center justify-center pb-2"></View>
      </ScrollView>
    </View>
  );
};

export default QuizV2;
