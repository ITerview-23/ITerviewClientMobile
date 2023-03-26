import React, {useEffect, useState} from 'react';
import {View, Modal, Text, TextInput, TouchableOpacity} from 'react-native';

interface Props {
  visible: boolean;
  onClose: () => void;
}

function QuizModal({visible, onClose}): JSX.Element {
  const [quiz, setQuiz] = useState();
  const [quizInput, setQuizInput] = useState('');
  const [quizInput2, setQuizInput2] = useState('');

  useEffect(() => {
    // get quiz
    fetch('https://www.iterview.site/graphql', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        query: `query ExampleQuery {
            getQuiz(quizListId: 1, userId: "1") {
                quizId
                quizInfo
              }
        }`,
      }),
    })
      .then(async response => {
        const data = await response.json();
        setQuiz(data.data.getQuiz);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View className="px-4 pt-8 flex-row justify-between">
        <View className="justify-center ">
          <Text className="text-2xl text-gray-900">데일리 퀴즈</Text>
          <Text className="text-gray-800">
            {new Date().toLocaleString('ko-KR', {
              month: 'short',
              day: 'numeric',
            })}
          </Text>
        </View>
        <TouchableOpacity
          onPress={onClose}
          className="w-8 h-8 bg-gray-200 rounded-full justify-center items-center">
          <Text>X</Text>
        </TouchableOpacity>
      </View>

      <View className="p-4">
        <View className="p-4 bg-blue-100 rounded-lg">
          <View className="flex-row items-center justify-center">
            <TextInput
              editable={true}
              autoFocus={true}
              numberOfLines={1}
              onChangeText={text => setQuizInput(text)}
              value={quizInput}
              className="pb-2 px-2 m-2 rounded-lg border-b-2 border-blue-500 bg-gray-100 text-lg"
            />

            <Text className="text-lg text-gray-900">는 사람이다. 그리고</Text>
            <TextInput
              editable={true}
              numberOfLines={1}
              onChangeText={text => setQuizInput2(text)}
              value={quizInput2}
              className="pb-2 px-2 m-2 rounded-lg border-b-2 border-blue-500 bg-gray-100 text-lg"
            />
            <Text className="text-lg text-gray-900">도 사람이다.</Text>
          </View>
        </View>
      </View>

      <View className="p-4">
        <TouchableOpacity className="p-2 bg-blue-500 rounded-lg items-center">
          <Text className="text-lg text-gray-100">제출하기</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

export default QuizModal;
