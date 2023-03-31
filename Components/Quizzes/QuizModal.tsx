import React, {useEffect, useState} from 'react';
import {
  View,
  Modal,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';

interface Props {
  visible: boolean;
  onClose: () => void;
  quiz: object;
  quizInfo: Array<string>;
}

function QuizModal({visible, onClose}): JSX.Element {
  const [quiz, setQuiz] = useState();
  const [quizInputList, setQuizInputList] = useState();

  // answer check
  const [isQuizAnswer, setQuizAnswer] = useState();

  // check message
  const [quizMessage, setQuizMessage] = useState('');

  const changeQuizInputByIndex = (index: number, text: string) => {
    if (quizInputList) {
      const oldInput = [...quizInputList];
      oldInput[index] = text;
      setQuizInputList(oldInput);
    }
  };

  // check answer
  const checkAnswer = () => {
    console.log(quizInputList);

    if (!quizInputList) {
      return;
    }
    // delete some quiz input with length 0
    const submitQuizInputList =
      quizInputList && quizInputList.filter(str => str.length != 0);

    console.log(submitQuizInputList);

    // request for checking answer
    fetch('https://www.iterview.site/graphql', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        query: `
          query ExampleQuery($quizId: Int!, $answer: [String!]!) {
            checkAnswer(quizId: $quizId, answer: $answer)
          }
        `,
        variables: {quizId: 1, answer: submitQuizInputList},
      }),
    })
      .then(async response => {
        const data = await response.json();
        setQuizAnswer(data.data.checkAnswer);
      })
      .catch(error => {
        console.log(error);
      });
  };

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

        // initiate quizinputlist
        tmpArray = Array(quiz && quiz.quizInfo.length).fill('');
        setQuizInputList(tmpArray);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <Modal
      visible={visible}
      animationType={'fade'}
      transparent={true}
      onRequestClose={onClose}>
      <SafeAreaView className="flex-1 bg-white">
        <View className="px-2 flex-row justify-between border-b-2 border-gray-100">
          <View className="justify-center">
            <TouchableOpacity
              onPress={onClose}
              className="w-8 h-8 bg-gray-200 rounded-full justify-center items-center">
              <Text>〈</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Image
              source={require('../Images/Logo128.png')}
              style={{width: 48, height: 48}}
            />
          </View>
        </View>

        <KeyboardAvoidingView>
          <View className="px-4 pt-4 flex-row justify-betweens">
            <View className="justify-center">
              <Text className="text-2xl text-gray-900">데일리 퀴즈</Text>
              <Text className="text-gray-800">
                {new Date().toLocaleString('ko-KR', {
                  month: 'short',
                  day: 'numeric',
                })}
              </Text>
            </View>
          </View>

          <View className="p-4">
            <View className="p-4 bg-blue-100 rounded-lg">
              <View className="flex-row flex-wrap items-center justify-center">
                {quiz &&
                  quiz.quizInfo.map((value, index) => {
                    if (value.length == 0) {
                      return (
                        <TextInput
                          key={index}
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
            </View>
          </View>

          <View className="p-4 items-center">
            <Text className="text-blue-900">
              {isQuizAnswer &&
                (isQuizAnswer == true ? '정답입니다!' : '오답입니다!')}
            </Text>
          </View>

          <View className="p-4">
            <TouchableOpacity
              onPress={() => {
                checkAnswer();
              }}
              className="p-2 bg-blue-500 rounded-lg items-center">
              <Text className="text-lg text-gray-100">제출하기</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}

export default QuizModal;
