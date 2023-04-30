/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  StatusBar,
  Linking,
} from 'react-native';

import DeviceInfo from 'react-native-device-info';

import Subject from './Components/Subjects/Subject';
import MyProfileModal from './Components/Profiles/MyProfileModal';
import QuizModal from './Components/Quizzes/QuizModal';

function MainScreen({navigation}: any): JSX.Element {
  const [deviceUniqueID, setdeviceUniqueID] = useState('');
  const [listOfSubject, setListOfSubject] = useState([]);

  // modal visible states
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [quizModalVisible, setQuizModalVisible] = useState(false);

  useEffect(() => {
    // get subject list of subject
    fetch('https://www.iterview.site/graphql', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        query: `query ExampleQuery {
          getListOfSubject {
            quizListId, name, description, image
          }
        }`,
      }),
    }).then(async response => {
      const data = await response.json();
      setListOfSubject(data.data.getListOfSubject);
    });

    // get unique device id
    DeviceInfo.getUniqueId().then(getUniqueId => {
      setdeviceUniqueID(getUniqueId);
    });
  }, []);

  return (
    <SafeAreaView className="bg-white" style={{flex: 1}}>
      <View className="px-2 flex-row justify-between border-b-[1px] border-gray-100">
        <View className="flex-row items-center">
          <Image
            source={require('./Components/Images/Logo128.png')}
            style={{width: 48, height: 48}}
          />
          <Text className="text-lg text-gray-700 font-medium">잇터뷰</Text>
        </View>
        <View className="items-center justify-center">
          {/* 프로필 버튼 - 추후 변경 예정, 1차 출시 때 미완성인 기능이므로 투명으로 색상 변경 */}
          <TouchableOpacity
            className="w-8 h-8 bg-trans rounded-full"
            onPress={() => setProfileModalVisible(true)}></TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        <View className="p-4">
          {/* 사용 팁  */}
          <TouchableOpacity
            onPress={() => Linking.openURL('https://iterview-23.github.io/')}
            className="p-4 bg-gray-100 rounded-2xl">
            <View className="flex-row justify-between">
              <Image
                source={require('./Components/Images/Icons/sparkles.png')}
                className="w-6 h-6"
              />
              <View className="pl-2 w-full">
                <View className="items-left flex-wrap">
                  <Text className="text-xs text-yellow-500">사용 팁</Text>
                  <Text className=" text-gray-700 font-medium">
                    잇터뷰 200% 활용법
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          {/* 주제별 퀴즈 헤더 */}
          <Text className="mt-6 text-lg font-medium text-gray-800">
            주제별 퀴즈
          </Text>

          {/* 데일리 면접 퀴즈  */}
          <TouchableOpacity
            onPress={
              () => navigation.navigate('QuizDaily')
              // setQuizModalVisible(true)
            }
            className="mt-4 p-6 bg-blue-100 rounded-2xl">
            <View className="flex-row justify-between">
              <Image
                source={require('./Components/Images/Icons/spiral-calendar.png')}
                className="w-8 h-8"
              />
              <View className="pl-2 w-full">
                <Text className="text-xs text-blue-500 font-bold">
                  {new Date().toLocaleString('ko-KR', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </Text>

                <View className="flex-row items-center flex-wrap">
                  <Text className="text-lg text-gray-900 font-bold">
                    데일리 퀴즈
                  </Text>
                </View>
                <Text className="text-gray-600">
                  다양한 주제의 퀴즈를 풀어보세요!
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* 주제 별 기술 면접 퀴즈 섹션 */}
          <View className="space-y-2">
            {listOfSubject &&
              listOfSubject.map((element, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      navigation.navigate('Quiz', {element: element})
                    }
                    className="mt-2 p-4 bg-gray-100 rounded-2xl">
                    <Subject element={element && element} />
                  </TouchableOpacity>
                );
              })}
          </View>
        </View>

        {/* Modal */}
        <MyProfileModal
          visible={profileModalVisible}
          onClose={() => setProfileModalVisible(false)}
        />
        <QuizModal
          visible={quizModalVisible}
          onClose={() => setQuizModalVisible(false)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default MainScreen;
