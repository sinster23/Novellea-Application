import { SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen";
import { StatusBar } from "expo-status-bar";
import {useFonts} from 'expo-font';
import {useAuthStore} from "../store/authStore";
import { useEffect } from "react";
SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  const {checkAuth,user,token} = useAuthStore();
  const [fontsLoaded] = useFonts({
    "JetBrainsMono-Medium": require("../assets/fonts/JetBrainsMono-Medium.ttf"),
  });


  useEffect(()=>{
    if(fontsLoaded) SplashScreen.hideAsync();
  },[fontsLoaded])

  useEffect(() => {
    checkAuth();
  },[])

  useEffect(()=>{
    const AuthScreen= segments[0] === "(auth)";
    const SignedIn= user && token;
    if(AuthScreen && SignedIn){
      router.navigate("(tabs)");
    }
    if(!AuthScreen && !SignedIn){
      router.navigate("(auth)");
    }
  },[user,token,segments])
  

  
  return (
  <SafeAreaProvider>
    <SafeScreen>
  <Stack screenOptions={{headerShown:false}}>
    <Stack.Screen name="(tabs)" />
    <Stack.Screen name="(auth)" />
  </Stack>
  </SafeScreen>
  <StatusBar style="dark"  />
  </SafeAreaProvider>
  );
}
