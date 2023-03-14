import React from "react";
import {Text, TouchableOpacity, View } from 'react-native'

function QuizStartSection(): JSX.Element {
    return(
        <TouchableOpacity style={{ backgroundColor:"#c8c8c8", borderRadius: 15}}>
            <View>

            </View>
            <View style={{padding: 10}}>
            <Text>PM와 디자이너를 위한</Text>
            <Text style={{ fontSize: 24}}>IT 상식 퀴즈</Text>
            </View>
            
        </TouchableOpacity>
    )
}

export default QuizStartSection