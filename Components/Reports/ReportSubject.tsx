import React from 'react';
import {View} from 'react-native';

import ReportSubjectInfo from './ReportSubjectInfo';

function ReportSubject({element, index, selSubjectId}: any): JSX.Element {
  // 만약 현재 선택한 주제일 경우 배경색 하이라이트
  if (index == selSubjectId) {
    return (
      <View className="p-4 items-center bg-blue-200 rounded-lg">
        <ReportSubjectInfo element={element} />
      </View>
    );
  } else {
    return (
      <View className="p-4 items-center bg-gray-100 rounded-lg">
        <ReportSubjectInfo element={element} />
      </View>
    );
  }
}

export default ReportSubject;
