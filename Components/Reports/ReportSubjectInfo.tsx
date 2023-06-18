import React from 'react';
import {Image, Text} from 'react-native';

function ReportSubjectInfo({element}: any): JSX.Element {
  return (
    <>
      <Image
        source={
          element.image
            ? {uri: element.image}
            : require('../Images/Icons/Global.png')
        }
        className="w-8 h-8"
      />
      <Text className="pt-2 text-gray-600">{element && element.name}</Text>
    </>
  );
}

export default ReportSubjectInfo;
