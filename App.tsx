/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Image,
} from 'react-native';

import DeviceInfo from 'react-native-device-info';

import Subject from './Components/Subjects/Subject';
import MyProfileModal from './Components/Profiles/MyProfileModal';
import QuizModal from './Components/Quizs/QuizModal';

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
      <View className="px-2 flex-row justify-between border-b-2 border-gray-100">
        <View className="flex-row items-center">
          <Image
            source={require('./Components/Images/Logo128.png')}
            style={{width: 48, height: 48}}
          />
        </View>
        <View className="items-center justify-center">
          <TouchableOpacity
            className="w-8 h-8 bg-slate-300 rounded-full"
            onPress={() => setProfileModalVisible(true)}></TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View className="p-4">
          <View className="mt-2">
            <Text className="text-xl text-gray-700">
              오늘도 상큼한{'\n'}IT터뷰 준비하세요.
            </Text>
          </View>

          {/* 데일리 면접 퀴즈  */}
          <View className="my-4 bg-blue-100 rounded-lg">
            <View className="p-4 flex-row item-center">
              <Image
                source={require('./Components/Images/Icons/spiral-calendar.png')}
                className="w-16 h-16"
              />
              <View className="pl-4">
                <Text className="text-lg text-gray-800">
                  {new Date().toLocaleString('ko-KR', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </Text>
                <Text className="text-2xl text-gray-900 font-bold">
                  데일리 퀴즈
                </Text>
              </View>
            </View>

            <View className="p-4">
              <Text className="text-gray-900">
                데일리 퀴즈를 풀고 포인트를 얻으세요!
              </Text>
              <TouchableOpacity
                className="mt-4 p-2 bg-blue-500 rounded-lg"
                onPress={() => setQuizModalVisible(true)}>
                <Text className="text-lg text-gray-100 text-center">
                  퀴즈 풀기
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 주제 별 기술 면접 퀴즈 섹션 */}
          <View className="mt-6">
            <Text className="text-xl text-gray-800 font-bold">
              주제 별 퀴즈
            </Text>
          </View>
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
