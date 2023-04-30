import React from 'react';
import {Text, View, SafeAreaView, Modal, Pressable} from 'react-native';

function QuizAnswerModal({visible, onClose, answer}: any): JSX.Element {
  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={onClose}
      animationType="fade">
      <SafeAreaView flex={1} style={{backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
        <View className="p-4 mx-4 mt-auto mb-auto bg-white rounded-2xl">
          <Text className="text-lg text-gray-700 font-medium">모범 답안</Text>
          <Text className="my-4 text-blue-600 font-medium">
            {answer && answer}
          </Text>
          <Pressable
            onPress={() => onClose()}
            className="mt-6 p-4 bg-blue-100 items-center rounded-lg">
            <Text className="text-blue-600">닫기</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

export default QuizAnswerModal;
