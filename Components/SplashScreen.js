import { Image, StyleSheet, View } from 'react-native'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Audio } from 'expo-av'

const splashScreens = [
  require('../assets/splashscreens/amit1.jpg'),
  require('../assets/splashscreens/amit2.jpg'), 
  require('../assets/splashscreens/amit3.jpg'),
  require('../assets/splashscreens/amit4.jpg'),
  require('../assets/splashscreens/amit5.jpg'),
  require('../assets/splashscreens/amit6.jpg'),
  require('../assets/splashscreens/amit7.jpg'),
  require('../assets/splashscreens/amit8.jpg'),
  require('../assets/splashscreens/amit9.jpg'),
  require('../assets/splashscreens/amit10.jpg'),
  require('../assets/splashscreens/amit11.jpg'),
  require('../assets/splashscreens/amit12.jpg'),
  require('../assets/splashscreens/amit13.jpg'),
  require('../assets/splashscreens/amit14.jpg'),
  require('../assets/splashscreens/amit15.jpg'),
  require('../assets/splashscreens/amit16.jpg'),
  require('../assets/splashscreens/amit17.jpg'),
  require('../assets/splashscreens/amit18.jpg'),
  require('../assets/splashscreens/amit19.jpg'),
  require('../assets/splashscreens/amit20.jpg'),
  require('../assets/splashscreens/amit21.jpg'),
  require('../assets/splashscreens/amit22.jpg'),
  require('../assets/splashscreens/amit23.jpg'),
  require('../assets/splashscreens/amit24.jpg'),
  require('../assets/splashscreens/amit25.jpg'),
  require('../assets/splashscreens/amit26.jpg'),
  require('../assets/splashscreens/amit27.jpg'),
  require('../assets/splashscreens/amit28.jpg'),
  require('../assets/splashscreens/amit29.jpg'),
  require('../assets/splashscreens/amit30.jpg'),
  require('../assets/splashscreens/amit31.jpg'),
  require('../assets/splashscreens/amit32.jpg'),
  require('../assets/splashscreens/amit33.jpg'),
  require('../assets/splashscreens/amit34.jpg'),
  require('../assets/splashscreens/amit35.jpg'),
  require('../assets/splashscreens/amit36.jpg'),
  require('../assets/splashscreens/amit37.jpg'),
  require('../assets/me.jpg')
]

const sayings = [
  require('../assets/sayings/DreamComeTrue.m4a'),
  require('../assets/sayings/DreamedYou.m4a'),
  require('../assets/sayings/Exception.m4a'),
  require('../assets/sayings/Flicker.m4a'),
  require('../assets/sayings/GottenHold.m4a'),
  require('../assets/sayings/HerTouch.m4a'),
  require('../assets/sayings/LiveWithoutYou.m4a'),
  require('../assets/sayings/LookInHerEyes.m4a'),
  require('../assets/sayings/Man.m4a'),
  require('../assets/sayings/MoreBeautiful.m4a'),
  require('../assets/sayings/Everything.m4a'),
  require('../assets/sayings/NewMeaning.m4a'),
  require('../assets/sayings/HerTouch.m4a'),
  require('../assets/sayings/NoSuch.m4a'),
  require('../assets/sayings/PassingTime.m4a'),
  require('../assets/sayings/Perfect.m4a'),
  require('../assets/sayings/ShoneOnMe.m4a'),
  require('../assets/sayings/Sun.m4a'),
  require('../assets/sayings/TheColours.m4a'),
  require('../assets/sayings/TillIDie.m4a'),
  require('../assets/sayings/Almaz.m4a'),
  require('../assets/sayings/BrandNew.m4a'),
  require('../assets/sayings/HeartAway.m4a'),
  require('../assets/sayings/Hide.m4a'),
  require('../assets/sayings/IfITried.m4a'),
  require('../assets/sayings/Intertwine.m4a'),
  require('../assets/sayings/KnowMe.m4a'),
  require('../assets/sayings/LikeTheSunshine.m4a'),
  require('../assets/sayings/Mountain.m4a'),
  require('../assets/sayings/NotATrace.m4a'),
  require('../assets/sayings/Silence.m4a'),
  require('../assets/sayings/ThatsNew.m4a'),
  require('../assets/sayings/Timeless.m4a'),
  require('../assets/sayings/WastedDays.m4a'),
  require('../assets/sayings/face.m4a'),
  require('../assets/sayings/dream.m4a'),
  require('../assets/sayings/feel3.m4a'),
  require('../assets/sayings/feel2.m4a'),
  require('../assets/sayings/feel1.m4a'),
  require('../assets/sayings/movecloser.m4a'),
  require('../assets/sayings/arizona1.m4a'),
  require('../assets/sayings/arizona2.m4a'),
  require('../assets/sayings/loveagain3.m4a'),
  require('../assets/sayings/loveagain2.m4a'),
  require('../assets/sayings/loveagain1.m4a'),
  require('../assets/sayings/tomorrow2.m4a'),
  require('../assets/sayings/tomorrow1.m4a'),
  require('../assets/sayings/physical3.m4a'),
  require('../assets/sayings/physical2.m4a'),
  require('../assets/sayings/physical1.m4a'),
  require('../assets/sayings/crazier.m4a'),
  require('../assets/sayings/fantasy.m4a'),
  require('../assets/sayings/withoutyou.m4a'),
  require('../assets/sayings/needyou.m4a'),
  require('../assets/sayings/endoftime.m4a'),
  require('../assets/sayings/whisper.m4a'),
  require('../assets/sayings/crazy.m4a'),
  require('../assets/sayings/onandon.m4a'),
  require('../assets/sayings/destiny.m4a'),
  require('../assets/sayings/centerfold.m4a'),
  require('../assets/sayings/repeat.m4a'),
  require('../assets/sayings/WakeUp.m4a')
]

const mySayings = [
  require('../assets/mysayings/Chocolates.m4a'),
  require('../assets/mysayings/Ass.m4a'),
  require('../assets/mysayings/Back.m4a'),
  require('../assets/mysayings/BumMe.m4a'),
  require('../assets/mysayings/DingaLing.m4a'),
  require('../assets/mysayings/Ernie.m4a'),
  require('../assets/mysayings/FDay.m4a'),
  require('../assets/mysayings/Flutter.m4a'),
  require('../assets/mysayings/Gay.m4a'),
  require('../assets/mysayings/Hugh.m4a'),
  require('../assets/mysayings/Mad.m4a'),
  require('../assets/mysayings/Mother.m4a'),
  require('../assets/mysayings/Suck.m4a'),
  require('../assets/mysayings/Shopping.m4a'),
  require('../assets/mysayings/Gums.m4a')
]

const SplashScreen = () => {

  const [ splashIndex, setSplashIndex ] = useState(0)

  useEffect (() => {
    const checkSplashMode = async () => {
      const randomSplash = getRandom(0,splashScreens.length-2)
      const randomSaying = getRandom(0,sayings.length-1)
      const randomMySaying = getRandom(0,mySayings.length-1)
      let splashMode = await AsyncStorage.getItem('SPLASH')
      if ( splashMode == null) {
        await AsyncStorage.setItem('SPLASH', 'me')
        splashMode = 'me'
      }
      if ( splashMode === 'amit' || splashMode === 'me') {
        setSplashIndex(splashMode === 'amit' ? randomSplash : splashScreens.length-1)
      } else {
        setSplashIndex(splashMode)
      }

      if ( splashMode === 'me') {
        const { sound } = await Audio.Sound.createAsync(mySayings[randomMySaying])
        await sound.playAsync()
      } else {
        const { sound } = await Audio.Sound.createAsync(sayings[randomSaying])
        await sound.playAsync()
      }
      
    }
    checkSplashMode()
  },[])

  const getRandom = (min,max)  => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return (
    <View style={styles.container}>
      <Image source={splashScreens[splashIndex]} style={styles.imageStyle}/> 
    </View>
  )

}

export default SplashScreen

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'black' 
  },
  imageStyle: {
    width: 384,
    height: 720,
    resizeMode: 'cover'
  }
})