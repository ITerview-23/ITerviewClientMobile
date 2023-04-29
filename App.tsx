/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Image,
  StatusBar,
} from 'react-native';

import DeviceInfo from 'react-native-device-info';

import Subject from './Components/Subjects/Subject';
import MyProfileModal from './Components/Profiles/MyProfileModal';
import QuizModal from './Components/Quizzes/QuizModal';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

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
      {/* 안드로이드 상태바 디자인 통일 */}
      <StatusBar backgroundColor={'#FFFFFF'} barStyle={'dark-content'} />
      <View className="px-2 flex-row justify-between border-b-[1px] border-gray-100">
        <View className="flex-row items-center">
          <Image
            source={require('./Components/Images/Logo128.png')}
            style={{width: 48, height: 48}}
          />
          <Text className="text-md text-gray-800 font-medium">잇터뷰</Text>
        </View>
        <View className="items-center justify-center">
          <TouchableOpacity
            className="w-8 h-8 bg-gray-200 rounded-full"
            onPress={() => setProfileModalVisible(true)}></TouchableOpacity>
        </View>
      </View>

      <ScrollView className="bg-gray-100">
        <View className="p-4">
          {/* 데일리 면접 퀴즈  */}
          <TouchableOpacity
            onPress={() => setQuizModalVisible(true)}
            className="p-4 bg-white rounded-lg shadow-lg shadow-black/40">
            <View className="flex-row justify-between">
              <Image
                source={require('./Components/Images/Icons/spiral-calendar.png')}
                className="w-8 h-8"
              />
              <View className="px-2 w-full">
                <View className="flex-row items-center flex-wrap">
                  <Text className="text-2xl text-black font-bold">
                    데일리 퀴즈
                  </Text>
                  <Text className="ml-2 p-1 text-xs bg-blue-100 text-blue-500 rounded-lg">
                    {new Date().toLocaleString('ko-KR', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </Text>
                </View>
                <Text className="pt-2 text-gray-600">
                  매일 바뀌는 다양한 주제의 퀴즈를 풀어보세요.
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* 주제 별 기술 면접 퀴즈 섹션 */}
          <View className="mt-2 space-y-2">
            {listOfSubject &&
              listOfSubject.map((element, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    className="bg-gray-100 rounded-lg">
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

export default App;
