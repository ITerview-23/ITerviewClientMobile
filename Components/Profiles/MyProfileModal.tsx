import React from 'react';
import {View, Modal, Text, TouchableOpacity, SafeAreaView} from 'react-native';

interface Props {
  visible: boolean;
  onClose: () => void;
}

function MyProfileModal({visible, onClose}): JSX.Element {
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView>
        <View className="px-4 pt-8 flex-row justify-between">
          <View className="justify-center items-center">
            <Text className="text-2xl text-gray-900">프로필</Text>
          </View>
          <TouchableOpacity
            onPress={onClose}
            className="w-8 h-8 bg-gray-100 rounded-full justify-center items-center">
            <Text className="text-gray-600">X</Text>
          </TouchableOpacity>
        </View>
        <View className="px-4 mt-4">
          <Text>개인 프로필</Text>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

export default MyProfileModal;
