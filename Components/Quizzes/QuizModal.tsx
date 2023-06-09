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
  ScrollView,
} from 'react-native';
import QuizAnswerModal from './QuizAnswerModal';

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
  const [isQuizAnswer, setQuizAnswer] = useState(undefined);

  // check message
  const [quizMessage, setQuizMessage] = useState('');

  // Modal
  const [quizAnswerModalVisible, setQuizAnswerModalVisible] = useState(false);

  const changeQuizInputByIndex = (index: number, text: string) => {
    if (quizInputList) {
      const oldInput = [...quizInputList];
      oldInput[index] = text;
      setQuizInputList(oldInput);
    }
  };

  // check answer
  const checkAnswer = () => {
    // delete some quiz input with lensgth 0
    const submitQuizInputList =
      quizInputList &&
      quizInputList.filter(str => typeof str == 'string' && str.length != 0);

    // [] : 리스트에 아무것도 입력하지 않은 경우
    if (submitQuizInputList.length == 0) {
      return;
    }

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
        return data.data.checkAnswer;
      })
      .then(answer => {
        setQuizAnswer(answer);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // 모범 답안을 표기하는 함수
  const showAnswer = () => {
    fetch('https://www.iterview.site/graphql', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        query: `
          query ExampleQuery($quizId: Int!) {
            getAnswer(quizId: $quizId)
          }
        `,
        variables: {quizId: 1},
      }),
    })
      .then(async response => {
        const data = await response.json();
        return data.data.getAnswer.toString();
      })
      .then(answer => {
        setQuizMessage(answer);
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
        <View className="px-2 flex-row justify-between border-b-[1px] border-gray-100">
          <View className="justify-center">
            <TouchableOpacity
              onPress={onClose}
              className="w-8 h-8 rounded-full justify-center items-center">
              <Text className="text-gray-600">ᐸ</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Image
              source={require('../Images/Logo128.png')}
              style={{width: 48, height: 48}}
            />
          </View>
        </View>

        <ScrollView>
          <KeyboardAvoidingView>
            <Text className="m-4 self-center text-lg font-bold text-gray-900">
              주제 : 운영체제
            </Text>
            <View className="m-4 bg-white rounded-2xl">
              <View>
                <View className="p-4 py-10 bg-blue-200 rounded-t-2xl">
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

              <TouchableOpacity
                onPress={() => {
                  checkAnswer();
                }}
                className="py-4 bg-blue-500 items-center rounded-b-2xl">
                <Text className="text-lg text-gray-100">답안 제출</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>

          <View className="p-4 items-center">
            {isQuizAnswer != undefined &&
              (isQuizAnswer == true ? (
                <Text className="text-blue-900">{'정답입니다!'}</Text>
              ) : (
                <Text className="text-blue-900">{'땡!'}</Text>
              ))}
            {quizMessage && (
              <Text className="text-blue-900">정답 : {quizMessage}</Text>
            )}
          </View>

          <View className="mx-4 flex-row justify-between border-[1px] border-gray-200 rounded-lg">
            {/* 이전 문제로 */}
            <TouchableOpacity className="p-2 items-center bg-gray-100 border-r-[1px] border-gray-200">
              <Text className="text-gray-600">이전 문제로</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setQuizAnswerModalVisible(true);
                // showAnswer();
              }}
              className="p-2 items-center">
              <Text className="text-gray-600">모범 답안</Text>
            </TouchableOpacity>

            {/* 다음 문제로 */}
            <TouchableOpacity className="p-2 items-center bg-gray-100 border-l-[1px] border-gray-200">
              <Text className="text-gray-600">다음 문제로</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Modal 
      <QuizAnswerModal
        visible={quizAnswerModalVisible}
        onClose={() => setQuizAnswerModalVisible(false)}
      />
      */}
    </Modal>
  );
}

export default QuizModal;
