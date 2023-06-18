import React, {useState} from 'react';
import {
  ScrollView,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import ReportSubject from './ReportSubject';

function ReportScreen({route, navigation}: any): JSX.Element {
  // 선택한 면접 주제
  const [selSubjectId, setSelSubjectId] = useState(-1);
  // 입력한 면접 질문
  const [quizInfo, setQuizInfo] = useState('');
  // 입력한 면접 답안
  const [answer, setAnswer] = useState([]);
  const [inputAnswer, setInputAnswer] = useState('');

  // 면접 답안 추가하는 함수
  const addAnswer = (newAnswer: string) => {
    setAnswer(prevAnswer => [...prevAnswer, newAnswer]);
  };

  // 면접 답안 삭제하는 함수
  const removeAnswer = (valueToRemove: string) => {
    setAnswer(prevAnswer =>
      prevAnswer.filter(value => value !== valueToRemove),
    );
  };

  const reportQuiz = async () => {
    // 면접 주제, 면접 질문, 면접 답안 모두 1개 이상 선택해야 함
    if (selSubjectId == -1 || !quizInfo || answer.length == 0) {
      return;
    }

    fetch('https://www.iterview.site/graphql', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        query: `
          query ExampleQuery($quizId: Int!) {
            reportQuiz(quizListId: $quizListId, quizInfo: $quizInfo, answer: $answer) {
              message
              result
            }
          }
        `,
        variables: {
          quizListId: selSubjectId && selSubjectId,
          quizInfo: quizInfo && quizInfo,
          answer: answer && answer,
        },
      }),
    }).then(async response => {
      const data = await response.json();
      return data.data.reportQuiz.toString();
    });
  };

  return (
    <>
      <SafeAreaView className="flex-1 bg-white">
        {/* header */}
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
            {/* 스크린 명 */}
            <View className="mx-4 self-center items-center">
              <Text className="px-2 pt-4 text-lg font-medium text-gray-800">
                면접 정보 제보
              </Text>
            </View>

            {/* 주제 선택 */}
            <View className="mx-4 self-center items-center">
              <Text className="px-2 py-2 text-gray-600">
                면접 주제를 알려주세요.
              </Text>
            </View>

            {/* 주제 목록 */}
            <ScrollView className="px-2 gap-2" horizontal={true}>
              {route.params.listOfSubject &&
                route.params.listOfSubject.map(
                  (element: any, index: number) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setSelSubjectId(index);
                        }}>
                        <ReportSubject
                          element={element}
                          key={index}
                          index={index}
                          selSubjectId={selSubjectId}
                        />
                      </TouchableOpacity>
                    );
                  },
                )}
            </ScrollView>

            {/* 면접 질문  */}
            <View className="mx-4 mt-4 self-center items-center">
              <Text className="px-2 py-2 text-gray-600">
                면접 질문을 알려주세요.
              </Text>
              <TextInput
                onChangeText={text => setQuizInfo(text)}
                className="bg-gray-100 p-4 rounded-lg border-2 border-gray-300 min-w-full"
                numberOfLines={3}
                editable={true}
              />
            </View>

            {/* 면접 답안 */}
            <View className="mx-4 mt-4 self-center items-center">
              <Text className="px-2 py-2 text-gray-600">
                면접 답안을 알려주세요.
              </Text>

              {/* 입력한 답안 목록 */}
              {answer &&
                answer.map((element, index): any => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        removeAnswer(element);
                      }}
                      className="my-1 p-4 rounded-lg min-w-full bg-blue-200">
                      <View className="flex-row justify-between">
                        <Text className="text-gray-700">{element}</Text>
                        <Text className="text-gray-500">X</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}

              {/* 답안 입력 */}
              <View className="my-2">
                <TextInput
                  className="bg-gray-100 p-4 rounded-lg border-2 border-blue-500 min-w-full"
                  value={inputAnswer}
                  onChangeText={text => {
                    setInputAnswer(text);
                  }}
                  numberOfLines={1}
                  editable={true}
                />
              </View>

              {/* 답안 추가 */}
              <TouchableOpacity
                onPress={() => {
                  if (inputAnswer) {
                    addAnswer(inputAnswer);
                    setInputAnswer('');
                  }
                }}
                className="p-4 bg-gray-100 rounded-lg items-center">
                <Text className="text-gray-500 text-center min-w-full">
                  답안 추가
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>

        {/* 제출 */}
        <TouchableOpacity
          onPress={() => {
            reportQuiz();
          }}
          className="p-4 bg-blue-500 items-center">
          <Text className="text-lg text-gray-100">제보하기</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

export default ReportScreen;
