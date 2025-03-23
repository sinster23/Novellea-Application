import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import styles from '../../assets/styles/login.styles'
import React, { useState } from 'react'
import {Ionicons} from '@expo/vector-icons'
import {Link} from 'expo-router'
import COLORS from '../../constants/colors'
import { useAuthStore } from '../../store/authStore'

export default function Login() {
  const [email,setEmail]= useState("");
  const [password,setPassword]= useState("");
  const [showPassword,setShowPassword]= useState(false);

  const {isLoading,login,isCheckingAuth}= useAuthStore();

  
  const handleLogin=async()=>{
    const result= await login(email,password);
    
    if(!result.success){
      Alert.alert("Error",result.error);}
    };

    if(isCheckingAuth) return null;

  return (
    <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <View style={styles.container}>
      <View style={styles.topIllustration}>
        <Image source={require('../../assets/images/i1.png')} 
        style={styles.illustrationImage} resizeMode="contain"/>
      </View>
      <View style={styles.card}>
        <View style={styles.formContainer}>
         {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color={COLORS.primary} style={styles.inputIcon} />
              <TextInput style={styles.input} placeholder="Enter your email" 
              placeholderTextColor={COLORS.placeholderText} value={email} onChangeText={setEmail}
               keyboardType='email-address' autoCapitalize='none' />
            </View>
          </View>
          {/* Password */}
          <View styles={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color={COLORS.primary} style={styles.inputIcon} />
              <TextInput style={styles.input} placeholder="Enter your password" 
              placeholderTextColor={COLORS.placeholderText} value={password} onChangeText={setPassword}
               secureTextEntry={!showPassword} />
               <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color={COLORS.primary} 
               style={styles.inputIcon} onPress={()=>setShowPassword(!showPassword)} />
            </View>
          </View>
          {/* Login Button */}
          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
            {isLoading ? <ActivityIndicator color={COLORS.white} /> : <Text style={styles.buttonText}>Login</Text>}
          </TouchableOpacity>
          {/* Signup */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <Link href="/signup" asChild>
            <TouchableOpacity>
              <Text style={styles.link}>Signup</Text>
            </TouchableOpacity>
            </Link>
          </View>  
        </View>
      </View>
    </View>
    </KeyboardAvoidingView>
  )
}