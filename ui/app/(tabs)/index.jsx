import { View, Text, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import {Image} from 'expo-image';
import React, { useEffect, useState } from 'react'
import {useAuthStore} from '../../store/authStore'
import styles from '../../assets/styles/home.styles';
import {Ionicons} from '@expo/vector-icons';
import { formatPublishDate } from '../../lib/utils';
import COLORS from '../../constants/colors';
import Loader from '../../components/Loader';


export default function Home() {
  const {token} = useAuthStore();
  const [books,setBooks]= useState([]);
  const [isLoading,setIsLoading]= useState(false);
  const [refreshing,setRefreshing]= useState(false);
  const [page,setPage]= useState(1);
  const [hasMore,setHasMore]= useState(true);

  const fetchBooks = async (pageNum=1, refresh=false) => {
    try{
      if(refresh) setRefreshing(true);
      else if (pageNum==1) setIsLoading(true);

      const response= await fetch(`https://react-native-novellea.onrender.com/api/books?page=${pageNum}&limit=2`,{
        headers: {Authorization: `Bearer ${token}`}
      });
      const data= await response.json();
      if(!response.ok){
        throw new Error(data.message);
      }
      const uniqueBooks= refresh || pageNum ==1? data.books: 
      Array.from(new Set([...books,...data.books].map((book)=>book._id))).map(id=>
      [...books, ...data.books].find(book=>book._id===id)
      );

      setBooks(uniqueBooks);
      setHasMore(pageNum<data.totalPages);
      setPage(pageNum);

    }catch(err){
        console.log("error in fetching books",err); 
   }finally{
        if(refresh) {
         
          setRefreshing(false);
          }
        else setIsLoading(false);
      }  
  }

  const onRefresh = async () => {
    await fetchBooks(1, true);
  };

  const handleLoadMore= async()=>{
    if(hasMore && !isLoading && !refreshing){
      await fetchBooks(page+1);
    } 
  }

  const renderRatingStars=(rating)=>{
    const stars=[];
    for(let i=1;i<=5;i++){
      stars.push(<Ionicons key={i} name={i<=rating?'star':'star-outline'} size={20} color={i<=rating?COLORS.primary:COLORS.textSecondary} />);
    }
    return <View style ={styles.ratingContainer}>{stars}</View>
  }

  useEffect(()=>{
    fetchBooks();
  },[])


  const renderItem = ({ item }) => {

    return (
      <View style={styles.bookCard}>
        <View style={styles.bookHeader}>
          <View style={styles.userInfo}>
            <Image
              source={{uri: item.user.profileImage}}
              style={styles.avatar}
            />
            <Text style={styles.username}>{item.user.username}</Text>
          </View>
        </View>
  
        <View style={styles.bookImageContainer}>
          <Image
            source={item.image}
            style={styles.bookImage}
            contentFit="cover"
            transition={500}
          />
        </View>
  
        <View style={styles.bookDetails}>
          <Text style={styles.bookTitle}>{item.title}</Text>
          <View style={styles.ratingContainer}>
            {renderRatingStars(item.rating)}
          </View>
          <Text style={styles.caption}>{item.caption}</Text>
          <Text style={styles.date}>
            Posted on {formatPublishDate(item.createdAt)}
          </Text>
        </View>
      </View>
    );
  };
  

  if(isLoading) return  <Loader />

  return (
    <View style={styles.container}>
      <FlatList 
        data={books}
        renderItem={renderItem}
        keyExtractor={(item)=>item._id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.headerIcon}>
            <Text style={styles.headerTitle}>Novellea</Text>
            <Image source={require('../../assets/images/icon.png')} style={{ marginBottom:6 ,width: 30, height: 30}} />
            </View>
            <Text style={styles.headerSubtitle}>Discover great reads from the community</Text> 
          </View>
        }
        ListFooterComponent={
          hasMore &&  books.length>0?(
            <ActivityIndicator style={styles.footerLoader} color={COLORS.primary} />
          ):<Text style={styles.headerSubtitle}>You have reached the end!!</Text>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="book-outline" size={60} color={COLORS.textPrimary} />
            <Text style={styles.emptyText}>No Recommendations Yet</Text>
            <Text style={styles.emptySubtext}>Be the first to share your thoughts and ideas 💡</Text>
          </View>
        }
        refreshControl={
          <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[COLORS.primary]}
          tintColor={COLORS.primary}
          />
        }
      />
    </View>
  )

}