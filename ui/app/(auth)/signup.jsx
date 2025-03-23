import { View, Text, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import styles from '../../assets/styles/signup.styles'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import COLORS from '../../constants/colors'
import {useRouter } from 'expo-router'
import { useAuthStore } from '../../store/authStore'
import { Image } from 'expo-image'

export default function signup() {
  const router= useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {user,isLoading,register} = useAuthStore();


  const handleSignup = async() => {
    const result= await register(username,email,password);

    if(!result.success){
      Alert.alert("Error",result.error);
    }
  }

  return (
    <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.headerIcon}>
            <Text style={styles.title}>Novellea</Text>
            <Image source={require('../../assets/images/icon.png')} style={{ marginBottom:6 ,width: 30, height: 30}} />
            </View>
            <Text style={styles.subtitle}>For Readers and Writers Alike</Text>
          </View>
          <View style={styles.formContainer}>
            {/* Username */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color={COLORS.primary} style={styles.inputIcon} />
                <TextInput style={styles.input} placeholder="johndoe" 
                placeholderTextColor={COLORS.placeholderText} value={username} onChangeText={setUsername} autoCapitalize='none'/>
              </View>
            </View>
            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color={COLORS.primary} style={styles.inputIcon} />
                <TextInput style={styles.input} placeholder="abcd@gmail.com" 
                placeholderTextColor={COLORS.placeholderText} value={email} onChangeText={setEmail} keyboardType='email-address' autoCapitalize='none'/>
              </View>
            </View> 
            {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color={COLORS.primary} style={styles.inputIcon} />
                <TextInput style={styles.input} placeholder="********" 
                placeholderTextColor={COLORS.placeholderText} value={password} onChangeText={setPassword} secureTextEntry={!showPassword}/>
                <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color={COLORS.primary} 
                style={styles.inputIcon} onPress={()=>setShowPassword(!showPassword)}/>
              </View> 
            </View>  
            {/* Signup Button */}
            <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={isLoading}>
              {isLoading ? <ActivityIndicator color={COLORS.white} /> : <Text style={styles.buttonText}>Sign Up</Text>}
            </TouchableOpacity>
            {/* Login */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
                <TouchableOpacity>
                  <Text style={styles.link} onPress={()=> router.back()}>Login</Text>
                </TouchableOpacity>  
            </View>  
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}