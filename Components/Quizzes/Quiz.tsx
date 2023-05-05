import React, {useEffect} from 'react';
import {View, TextInput, Text} from 'react-native';

const Quiz = ({quiz, changeQuizInputByIndex}: any): JSX.Element => {
  useEffect(() => {}, [quiz]);

  return (
    <View className="flex flex-row flex-wrap items-center justify-center">
      {quiz &&
        quiz.quizInfo.map((value, index) => {
          if (value.length == 0) {
            return (
              <TextInput
                key={index}
                ref={input => {
                  this.textInput = input;
                }}
                onChangeText={text => {
                  changeQuizInputByIndex(index, text);
                }}
                editable={true}
                numberOfLines={1}
                className="pb-2 px-2 m-2 rounded-lg border-b-2 border-blue-500 bg-gray-100 text-lg"
              />
            );
          } else {
            return (
              <Text key={index} className="text-lg text-gray-900">
                {value}
              </Text>
            );
          }
        })}
    </View>
  );
};

export default Quiz;
