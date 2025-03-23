import { View, Text,StyleSheet } from 'react-native';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import React from 'react';
import COLORS from '../constants/colors';

export default function SafeScreen({children}) {
    const insets= useSafeAreaInsets();
  return (
    <View style={[styles.container,{paddingTop:insets.top},{paddingBottom:insets.bottom}]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: COLORS.background,
    }
})