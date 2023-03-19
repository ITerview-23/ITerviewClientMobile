import React, { useEffect, useState } from "react";
import {Text, TouchableOpacity, View } from 'react-native'

function QuizStartSection({ title, subtitle}): JSX.Element {

    return(
        <TouchableOpacity style={{ backgroundColor:"#c8c8c8", borderRadius: 15}}>
            <View>

            </View>
            <View style={{padding: 10}}>
            <Text>{subtitle && subtitle}</Text>
            <Text style={{ fontSize: 24}}>{title && title}</Text>
            </View>
            
        </TouchableOpacity>
    )
}

export default QuizStartSection