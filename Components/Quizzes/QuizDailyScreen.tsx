import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

import QuizAnswerModal from './QuizAnswerModal';

import Quiz from './Quiz';

interface Props {
  visible: boolean;
  onClose: () => void;
  quiz: object;
  quizInfo: Array<string>;
}

function QuizDailyScreen({route, navigation}: any): JSX.Element {
  const [quiz, setQuiz] = useState();
  const [quizInputList, setQuizInputList] = useState();

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
        variables: {quizId: quiz && quiz.quizId, answer: submitQuizInputList},
      }),
    })
      .then(async response => {
        const data = await response.json();
        return data.data.checkAnswer;
      })
      .then(answer => {
        if (answer == true) {
          setQuizMessage('정답입니다!');
        } else {
          setQuizMessage('틀렸습니다!');
        }
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
        variables: {quizId: quiz && quiz.quizId},
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

  const getQuiz = () => {
    // 퀴즈 데이터 초기화
    setQuiz({quizId: -1, quizInfo: []});

    // get quiz
    fetch('https://www.iterview.site/graphql', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        query: `query ExampleQuery {
            getDailyQuiz(userId: "1") {
                quizId
                quizInfo
            }
        }`,
      }),
    })
      .then(async response => {
        const data = await response.json();
        setQuiz(data.data.getDailyQuiz);

        // initiate quizinputlist
        tmpArray = Array(quiz && quiz.quizInfo.length).fill('');
        setQuizInputList(tmpArray);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getQuiz();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-2 flex-row justify-between border-b-[1px] border-gray-100">
        <View className="justify-center">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="justify-center items-center">
            <Text className="ml-2 text-gray-500 text-lg">닫기</Text>
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
          <View className="m-4 self-center items-center">
            <Text className="px-2 pt-2 text-gray-500 rounded-t-2xl">
              모든 주제 포함
            </Text>
            <Text className="px-2 pb-2 text-lg font-medium text-gray-800">
              데일리 퀴즈
            </Text>
          </View>

          <View className="m-4 bg-white rounded-2xl">
            <View>
              <View className="p-4 pb-10 bg-blue-200 rounded-t-2xl">
                <TouchableOpacity
                  onPress={() => {
                    showAnswer();
                  }}
                  className="p-2 pb-4 items-end">
                  <Text className="text-blue-600">모범 답안</Text>
                </TouchableOpacity>

                <Quiz
                  quiz={quiz && quiz}
                  changeQuizInputByIndex={changeQuizInputByIndex}
                />
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
          {quizMessage && <Text className="text-blue-900"> {quizMessage}</Text>}
        </View>

        <View className="px-4 pb-6 flex-row justify-end">
          {/* 다음 문제로 */}
          <TouchableOpacity
            onPress={() => {
              getQuiz();
              setQuizMessage('');
            }}
            className="p-2 items-center">
            <Text className="text-gray-600">다음 문제로</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default QuizDailyScreen;
