import React from 'react';
import {View, Text, Image} from 'react-native';

function Subject({element}): JSX.Element {
  return (
    <View className="m-2 flex-row justify-between">
      <View className="flex-row">
        <Image
          source={
            element.image
              ? {uri: element.image}
              : require('../Images/Icons/Global.png')
          }
          className="w-8 h-8"
        />
        <View className="ml-2">
          <Text className="text-lg font-bold text-gray-900">
            {element.name ?? '제목을 입력하세요.'}
          </Text>
          <Text className="text-gray-600">
            {element.description ?? '설명을 입력하세요.'}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default Subject;
