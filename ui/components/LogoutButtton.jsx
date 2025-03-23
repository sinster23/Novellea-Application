import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import styles from '../assets/styles/profile.styles'
import { useAuthStore } from '../store/authStore'
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constants/colors';

export default function LogoutButtton() {
  const {logout}= useAuthStore();
  
  const confirmLogout= async()=>{
    Alert.alert("Logout", "Are you sure you want to logout?",[
        {text:"Cancel",style:"cancel"},
        {text:"Logout",onPress:async()=>{
            await logout();
        },style:"destructive"},
    ])
  }

  return (
    <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
      <Ionicons name="log-out-outline" size={20} color={COLORS.white} />
        <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>

  )
}