import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuthStore = create(((set)=>({
    user: null,
    token: null,
    isLoading:false,
    isCheckingAuth:true,

    register:async(username,email,password)=>{
        set({isLoading:true});
        try{
            const response= await fetch("https://react-native-novellea.onrender.com/api/auth/register",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({username,email,password})
            });
            const data= await response.json();
            if(!response.ok){
                throw new Error(data.message);
            }
            await AsyncStorage.setItem("user",JSON.stringify(data.user));
            await AsyncStorage.setItem("token",data.token);
            set({user:data.user,token:data.token,isLoading:false});
            return {success:true};
        }catch(err){
            set({isLoading:false});
            return {success:false, error:err.message};
        }
    },

    login: async(email,password)=>{
        set({isLoading:true});
        try{
            const response= await fetch("https://react-native-novellea.onrender.com/api/auth/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({email,password})
            })
            const data= await response.json();
            if(!response.ok){
                throw new Error(data.message);
            }
            await AsyncStorage.setItem("user",JSON.stringify(data.user));
            await AsyncStorage.setItem("token",data.token);
            set({user:data.user,token:data.token,isLoading:false});
            return {success:true};
        }catch(err){
            set({isLoading:false});
            return {success:false, error:err.message};}
    },

    checkAuth: async()=>{
        try{
            const token= await AsyncStorage.getItem("token");
            const userjson= await AsyncStorage.getItem("user");
            const user= userjson? JSON.parse(userjson): null;
            set({user,token});
        }catch(error){
            console.log("auth check failed",error);
        }finally{
            set({isCheckingAuth:false});
        }
    },

    logout: async()=>{
        await AsyncStorage.removeItem("user");
        await AsyncStorage.removeItem("token");
        set({user:null,token:null});
    }
})));
