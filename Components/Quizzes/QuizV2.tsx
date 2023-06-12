import React from 'react';
import {View, TextInput, Text, ScrollView} from 'react-native';

const QuizV2 = ({quiz, changeQuizInputByIndex}: any): JSX.Element => {
  return (
    <View style={{height: 240}}>
      <ScrollView>
        <View className="flex flex-row flex-wrap items-center justify-center pb-2"></View>
        {/* 퀴즈 내용 */}
        <Text className="text-lg text-gray-900">{quiz && quiz.quizInfo}</Text>

        {/* 퀴즈 인풋 */}
        <Text className="mt-6 text-sm text-gray-500">답안을 작성하세요.</Text>
        {quiz &&
          Array.from({length: quiz.answerNum}, (_, index) => {
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
                className="p-2 m-2 rounded-lg border-2 border-blue-500 bg-white text-lg"
              />
            );
          })}
      </ScrollView>
    </View>
  );
};

export default QuizV2;
