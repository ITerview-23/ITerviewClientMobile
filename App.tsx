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

  const [deviceUniqueID, setdeviceUniqueID] = useState("")
  const [listOfSubject, setListOfSubject] = useState([])

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    
    // get subject list of subject
    fetch('https://www.iterview.site/graphql', 
      { method : 'POST',
        headers: {"Content-Type": "application/json"},
        body : JSON.stringify({query: 
          `query ExampleQuery {
          getListOfSubject {
            quizListId, name, description, image
          }
        }`
      })})
        .then(async (response) => {
          const data = await response.json()
          setListOfSubject(data.data.getListOfSubject)
        }
    )
    
    // get unique device id
    DeviceInfo.getUniqueId().then((getUniqueId) => {
      setdeviceUniqueID(getUniqueId)
    })

  }, [])

  return (
    <SafeAreaView style={{flex: 1}}>
      <View className='px-2 flex-row justify-between' style={{ borderBottomWidth: 1, borderColor: '#e0e0e0'}}>
        <View className='flex-row items-center'>
          <Image source={require('./Components/Images/Logo128.png')} style={{width: 48, height: 48}}/>
        </View>
        <View className='items-center justify-center'>
          <TouchableOpacity className='w-8 h-8 bg-slate-300 rounded-full'></TouchableOpacity>
        </View>
      </View>
      <ScrollView className="p-4">
        <View className="mt-2">
          <Text className="text-xl text-gray-800 font-bold">오늘도 상큼한{'\n'}IT터뷰 준비하세요.</Text>
      </View>

       {listOfSubject && listOfSubject.map((element, index) => {
        return (
          <View key={index} className="my-4 bg-blue-100 rounded-lg">
          <ImageBackground className="h-24" imageStyle={{borderTopLeftRadius: 10, borderTopRightRadius: 10}} source={{uri : element.image ?? "https://wallpapers.microsoft.design/images/grid-29-@1x.jpg"}} resizeMode='contain'>
          </ImageBackground>
          <View className='p-4'>
            <Text className='text-gray-900'>{element.description ?? "여기는 부제목, 변수명은 description입니다."}</Text>
            <Text className='text-2xl font-bold'>{element.name ?? "여기는 제목, 변수명은 Name 입니다."}</Text>
            <TouchableOpacity className='mt-6 p-2 bg-blue-500 rounded-lg'>
              <Text className='text-lg text-blue-100 text-center'>퀴즈 풀기</Text>
            </TouchableOpacity>
            </View>
          </View>
        )
       })}

       <View className='p-4 bg-blue-100 rounded-lg '>
          <Text className='font-bold text-gray-900'>남선생께 드리는 편지</Text>
          <Text className="mt-4 text-gray-900">기기 고유 ID는 변수 명 deviceUniqueID : {deviceUniqueID && deviceUniqueID}</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
