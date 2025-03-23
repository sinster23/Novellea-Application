import { View, Text, Alert, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router';
import {useAuthStore} from '../../store/authStore'
import { use } from 'react';
import styles from '../../assets/styles/profile.styles'
import ProfileHeader from '../../components/ProfileHeader';
import LogoutButtton from '../../components/LogoutButtton';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../constants/colors';
import { Image } from 'expo-image';
import Loader from '../../components/Loader';

export default function Profile(){
  const [books,setBooks]= useState([]);
  const [isLoading,setisLoading]= useState(true);
  const [refreshing,setrefreshing]= useState(false);
  const [deletedBookId,setDeletedBookId]= useState(null);
  
  const {token}= useAuthStore();
  const router= useRouter();
  
  const renderBookItem = ({ item }) => (
    <View style={styles.bookItem}>
      <Image source={item.image} style={styles.bookImage} />
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <View style={styles.ratingContainer}>{renderRatingStars(item.rating)}</View>
        <Text style={styles.bookCaption} numberOfLines={2}>{item.caption}</Text>
        <Text style={styles.bookDate}>Posted on {new Date(item.createdAt).toLocaleDateString()}</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={()=>{confirmDelete(item._id)}}>
        {deletedBookId === item._id ? <ActivityIndicator color={COLORS.primary} size="small" />
         : <Ionicons name="trash-outline" size={20} color={COLORS.primary} />}
      </TouchableOpacity>
    </View>
  )

  const renderRatingStars=(rating)=>{
    const stars=[];
    for(let i=1;i<=5;i++){
      stars.push(<Ionicons key={i} name={i<=rating?'star':'star-outline'} size={20} color={i<=rating?COLORS.primary:COLORS.textSecondary} />);
    }
    return <View style ={styles.ratingContainer}>{stars}</View>
  }


  const handleBookDelete= async(bookId)=>{
    try{
      setDeletedBookId(bookId);
      const response= await fetch(`https://react-native-novellea.onrender.com/api/books/${bookId}`,{
        method:"DELETE",
        headers:{
          Authorization:`Bearer ${token}`,
        },
      });
      const data= await response.json();
      if(!response.ok){
        throw new Error(data.message);
      }
      setBooks(books.filter(book=>book._id!==bookId));
      Alert.alert("Success", "Recommendation deleted successfully");
    }catch(err){
      console.log("Error in deleting book",err);
    }finally{
      setDeletedBookId(null);
    }
  }

  const confirmDelete= async(bookId)=>{
    Alert.alert("Delete Recommendation", "Are you sure you want to delete this recommendation?",[
        {text:"Cancel",style:"cancel"},
        {text:"Delete",onPress:()=>{handleBookDelete(bookId)},style:"destructive"},
    ])
  }

  const fetchData= async()=>{
    try{
      setisLoading(true);
      const response= await fetch('https://react-native-novellea.onrender.com/api/books/user',{
        headers:{
          Authorization:`Bearer ${token}`,
        },
      });
      const data= await response.json();
      if(!response.ok) throw new Error(data.message);
      setBooks(data);
      }catch(error){
        console.log(error);
        Alert.alert("Failed to load profile data. Pull down to refresh");
      }finally{
        setisLoading(false);
      }
  }

  const handleRefersh= async()=>{
    setrefreshing(true);
    await fetchData();
    setrefreshing(false);
  }

  useEffect(()=>{
    fetchData();
  },[])

  if(isLoading && !refreshing) return  <Loader />  

  return(
    <View style={styles.container}>
       <ProfileHeader />
       <LogoutButtton /> 
       <View style={styles.booksHeader}>
        <Text style={styles.booksTitle}>Your Recommendations 📚</Text>
        <Text style={styles.booksCount}>{books.length} Novels</Text>
        </View>
        <FlatList
          data={books}
          renderItem={renderBookItem}
          keyExtractor={(item)=>item._id}
          contentContainerStyle={styles.booksList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="book-outline" size={50} color={COLORS.textSecondary} />
              <Text style={styles.emptyText}>No Recommendations Yet</Text>
              <TouchableOpacity style={styles.addButton} onPress={()=>router.push("/create")}>
                <Text style={styles.addButtonText}>Add your first Novel</Text>
              </TouchableOpacity>
            </View>
          }
          refreshControl={
            <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefersh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
            />
          }
        />
       
    </View>
  )

}