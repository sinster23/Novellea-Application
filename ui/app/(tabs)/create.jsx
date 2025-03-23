import { View, Text, KeyboardAvoidingView, ScrollView, Platform, TextInput, TouchableOpacity, Image, Linking, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import styles from '../../assets/styles/create.styles';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../constants/colors';
import { Alert } from 'react-native';
import {useAuthStore} from '../../store/authStore';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function Create() {
    const [title,setTitle]= useState("");
    const [caption, setCaption]= useState("");
    const [image, setImage]= useState(null);
    const [rating, setRating]= useState(3);
    const [imageBase64,setImageBase64]= useState(null);
    const [imageUri,setImageUri]= useState(null);
    const [isLoading, setIsLoading]= useState(false);

    const {token} = useAuthStore();

    const router = useRouter();
    const pickImage = async () => {
        try {
          if (Platform.OS !== 'web') {
            const { status: existingStatus } = await ImagePicker.getMediaLibraryPermissionsAsync();
      
            let finalStatus = existingStatus;
      
            if (existingStatus !== 'granted') {
              const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
              finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                Alert.alert(
                    '⚠️ Permission Needed',
                    'We need access to your photo library 📷 to select and upload images. Please enable it in settings.',
                    [
                      {
                        text: 'Not Now',
                        style: 'cancel'
                      },
                      {
                        text: 'Open Settings',
                        onPress: () => Linking.openSettings()
                      }
                    ]
                  );
              return;
            }
          }
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "images",
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
            base64: true,
          });
      
          if (!result.canceled) {
            setImage(result.assets[0].uri);
          }
          if(result.assets[0].base64){
            setImageBase64(result.assets[0].base64);
          }else{
            const base64= await FileSystem.readAsStringAsync(result.assets[0].uri,{
                encoding:FileSystem.EncodingType.Base64});
                setImageBase64(base64);
          }
      
        } catch (err) { }
      }

    const handleSubmit = async () => {
        
        if(!title || !caption || !rating || !imageBase64){
            Alert.alert(
                '⚠️ Missing Fields',
                'Please fill all the fields before submitting.',
                [
                  {
                    text: 'OK',
                    style: 'cancel'
                  },
                ]
              );
            return;
        }
        try{
            setIsLoading(true);
            const uriParts= image.split(".");
            const fileType= uriParts[uriParts.length-1];
            const ImageType= fileType? `image/${fileType.toLowerCase()}`:"image/jpeg";

            const ImageDataUrl= `data:${ImageType};base64,${imageBase64}`;

            const response= await fetch("https://react-native-novellea.onrender.com/api/books",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },
                body:JSON.stringify({title,caption,rating:rating.toString(),image:ImageDataUrl})
            })

            const data= await response.json();
            if(!response.ok){
                throw new Error(data.message);
            }
            Alert.alert("Success","Your novel recommendation has been shared successfully!");
            setTitle("");
            setCaption("");
            setRating(3);
            setImageBase64(null);
            setImage(null);
            router.push("/");
        }catch(err){
            console.log("Error in creating post",err);
            Alert.alert("Error",err.message);
        }finally{
            setIsLoading(false);
        }
    }

    const renderRatingPicker = () => {
        const stars=[];
        for(let i=1;i<=5;i++){
            stars.push(<TouchableOpacity key={i} onPress={()=>setRating(i)} style={styles.starButton}>
                <Ionicons name={i<=rating?'star':'star-outline'} size={20} color={i<=rating?"#f4b400":COLORS.textSecondary} />
            </TouchableOpacity>);
        }
        return <View style ={styles.ratingContainer}>{stars}</View>
    }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}
    >
        <ScrollView contentContainerStyle={styles.container} style={styles.scrollViewStyle}>
            <View style={styles.card}>
                <View style={styles.header}>
                    <Text style={styles.title}>Add Novel Recommendation</Text>
                    <Text style={styles.subtitle}>Share your thoughts and ideas💡</Text>
                </View>
                <View style={styles.form}>
                    {/*title*/}
                    <View style={styles.formGroup}>
                        <Text style={styles.label}> Novel Title</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="book-outline" size={20} color={COLORS.placeholderText} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input} placeholder='Enter Novel Title' 
                                placeholderTextColor={COLORS.placeholderText} value={title}
                                onChangeText={setTitle} />
                        </View>
                    </View>
                    {/*rating*/}
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Your Rating</Text>
                        {renderRatingPicker()}
                    </View>
                    {/*image*/}
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Novel Cover</Text>
                        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                            {image? (
                                <Image source={{uri:image}} style={styles.previewImage} />
                            ) : ( 
                                <View style={styles.placeholderContainer}>
                                <Ionicons name="image-outline" size={40} color={COLORS.textSecondary} />
                                <Text style={styles.placeholderText}>Tap to add image</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                    {/*caption*/}
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Caption</Text>
                        <TextInput 
                        style={styles.textArea} placeholder='Write your review and thoughts about this novel...' 
                        placeholderTextColor={COLORS.placeholderText} value={caption}
                        onChangeText={setCaption} multiline
                        textAlignVertical='top'
                        />
                    </View>  
                    {/*submit*/}
                    <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isLoading}>
                        {isLoading?(
                            <ActivityIndicator color={COLORS.white} />
                        ):(
                            <>
                            <Ionicons name="cloud-upload-outline" size={20} color={COLORS.white} style={styles.buttonIcon} />
                            <Text style={styles.buttonText}>Share</Text>
                            </>
                        )}
                    </TouchableOpacity>    
                </View>
            </View>
        </ScrollView>
    </KeyboardAvoidingView>
  )
}