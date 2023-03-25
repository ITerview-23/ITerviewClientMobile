/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {cloneElement, useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Image,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import QuizStartSection from './Components/QuizStartSection';
import DeviceInfo from 'react-native-device-info';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [deviceUniqueID, setdeviceUniqueID] = useState('');
  const [listOfSubject, setListOfSubject] = useState([]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

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
      <View
        className="px-2 flex-row justify-between"
        style={{borderBottomWidth: 1, borderColor: '#e0e0e0'}}>
        <View className="flex-row items-center">
          <Image
            source={require('./Components/Images/Logo128.png')}
            style={{width: 48, height: 48}}
          />
        </View>
        <View className="items-center justify-center">
          <TouchableOpacity className="w-8 h-8 bg-slate-300 rounded-full"></TouchableOpacity>
        </View>
      </View>
      <ScrollView className="p-4">
        <View className="mt-2">
          <Text className="text-xl text-gray-700 font-bold">
            오늘도 상큼한{'\n'}IT터뷰 준비하세요.
          </Text>
        </View>

        <View className="my-4 rounded-lg">
          <ImageBackground
            className="h-24"
            imageStyle={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            source={{
              uri: 'https://wallpapers.microsoft.design/images/grid-29-@1x.jpg',
            }}
            resizeMode="contain"></ImageBackground>
        </View>

        <View className="my-4 bg-blue-100 rounded-lg">
          <View className="p-4">
            <Text className="text-gray-900"></Text>
            <Text className="text-2xl text-gray-900 font-bold">3월 24일</Text>
            <TouchableOpacity className="mt-4 p-2 bg-blue-500 rounded-lg">
              <Text className="text-lg text-blue-100 text-center">
                퀴즈 풀기
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 주제 별 기술 면접 퀴즈 섹션 */}
        <View className="mt-6">
          <Text className="text-xl text-gray-800 font-bold">주제별 퀴즈</Text>
        </View>
        <View className="mt-2 space-y-2">
          {listOfSubject &&
            listOfSubject.map((element, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  className="bg-gray-100 rounded-lg">
                  <View className="m-2 flex-row">
                    <View>
                      <Image
                        source={require('./Components/Images/Icons/Global.png')}
                        className="w-12 h-12"
                      />
                      <View className="ml-2">
                        <Text className="text-lg font-bold text-gray-900">
                          {element.name ?? '제목을 입력하세요.'}
                        </Text>
                        <Text className="text-gray-900">
                          {element.description ?? '설명을 입력하세요.'}
                        </Text>
                      </View>
                      <View>
                        <Text className="text-lg font-bold text-gray-900">
                          〉
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
