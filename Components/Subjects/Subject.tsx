import React from 'react';
import {View, Text, Image} from 'react-native';

function Subject({element}): JSX.Element {
  return (
    <View className="m-2 flex-row justify-between">
      <View className="flex-row">
        <Image
          source={require('../Images/Icons/Global.png')}
          className="w-10 h-10 self-center"
        />
        <View className="ml-2">
          <Text className="text-lg font-bold text-gray-900">
            {element.name ?? '제목을 입력하세요.'}
          </Text>
          <Text className="text-gray-900">
            {element.description ?? '설명을 입력하세요.'}
          </Text>
        </View>
      </View>
      <View className="justify-center">
        <Text className="text-lg font-bold text-gray-400">〉</Text>
      </View>
    </View>
  );
}

export default Subject;