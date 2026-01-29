import { useEffect, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Drawer } from 'expo-router/drawer'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { FontAwesome, Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { View, Image, StyleSheet, Text, Dimensions } from 'react-native'
import Me from '../../assets/circles/me-circle.png'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Audio } from 'expo-av'

const circleScreens = [
  require('../../assets/circles/amit-circle1.png'),
  require('../../assets/circles/amit-circle2.png'),
  require('../../assets/circles/amit-circle3.png'),
  require('../../assets/circles/amit-circle4.png'),
  require('../../assets/circles/amit-circle5.png'),
  require('../../assets/circles/amit-circle6.png'),
  require('../../assets/circles/amit-circle7.png'),
  require('../../assets/circles/amit-circle8.png'),
  require('../../assets/circles/amit-circle9.png'),
  require('../../assets/circles/amit-circle10.png'),
  require('../../assets/circles/amit-circle11.png'),
  require('../../assets/circles/amit-circle12.png'),
]

const randomCircle = Math.floor(Math.random() * circleScreens.length)

const mySayings = [
  require('../../assets/sayings/DreamComeTrue.m4a'),
  require('../../assets/sayings/DreamedYou.m4a'),
  require('../../assets/sayings/Exception.m4a'),
  require('../../assets/sayings/Flicker.m4a'),
  require('../../assets/sayings/GottenHold.m4a'),
  require('../../assets/sayings/HerTouch.m4a'),
  require('../../assets/sayings/LiveWithoutYou.m4a'),
  require('../../assets/sayings/LookInHerEyes.m4a'),
  require('../../assets/sayings/Man.m4a'),
  require('../../assets/sayings/MoreBeautiful.m4a'),
  require('../../assets/sayings/Everything.m4a'),
  require('../../assets/sayings/NewMeaning.m4a'),
  require('../../assets/sayings/HerTouch.m4a'),
  require('../../assets/sayings/NoSuch.m4a'),
  require('../../assets/sayings/PassingTime.m4a'),
  require('../../assets/sayings/Perfect.m4a'),
  require('../../assets/sayings/ShoneOnMe.m4a'),
  require('../../assets/sayings/Sun.m4a'),
  require('../../assets/sayings/TheColours.m4a'),
  require('../../assets/sayings/TillIDie.m4a'),
  require('../../assets/sayings/Almaz.m4a'),
  require('../../assets/sayings/BrandNew.m4a'),
  require('../../assets/sayings/HeartAway.m4a'),
  require('../../assets/sayings/Hide.m4a'),
  require('../../assets/sayings/IfITried.m4a'),
  require('../../assets/sayings/Intertwine.m4a'),
  require('../../assets/sayings/KnowMe.m4a'),
  require('../../assets/sayings/LikeTheSunshine.m4a'),
  require('../../assets/sayings/Mountain.m4a'),
  require('../../assets/sayings/NotATrace.m4a'),
  require('../../assets/sayings/Silence.m4a'),
  require('../../assets/sayings/ThatsNew.m4a'),
  require('../../assets/sayings/Timeless.m4a'),
  require('../../assets/sayings/face.m4a'),
  require('../../assets/sayings/dream.m4a'),
  require('../../assets/sayings/feel3.m4a'),
  require('../../assets/sayings/feel2.m4a'),
  require('../../assets/sayings/feel1.m4a'),
  require('../../assets/sayings/movecloser.m4a'),
  require('../../assets/sayings/arizona1.m4a'),
  require('../../assets/sayings/arizona2.m4a'),
  require('../../assets/sayings/loveagain3.m4a'),
  require('../../assets/sayings/loveagain2.m4a'),
  require('../../assets/sayings/loveagain1.m4a'),
  require('../../assets/sayings/tomorrow2.m4a'),
  require('../../assets/sayings/tomorrow1.m4a'),
  require('../../assets/sayings/physical3.m4a'),
  require('../../assets/sayings/physical2.m4a'),
  require('../../assets/sayings/physical1.m4a'),
  require('../../assets/sayings/crazier.m4a'),
  require('../../assets/sayings/fantasy.m4a'),
  require('../../assets/sayings/withoutyou.m4a'),
  require('../../assets/sayings/needyou.m4a'),
  require('../../assets/sayings/endoftime.m4a'),
  require('../../assets/sayings/whisper.m4a'),
  require('../../assets/sayings/crazy.m4a'),
  require('../../assets/sayings/onandon.m4a'),
  require('../../assets/sayings/destiny.m4a'),
  require('../../assets/sayings/centerfold.m4a'),
  require('../../assets/sayings/repeat.m4a'),
  require('../../assets/sayings/WastedDays.m4a'),
  require('../../assets/sayings/WakeUp.m4a')
]

const initiateRandomSaying = async (props) => {
  const randomSaying = Math.floor(Math.random() * mySayings.length)
  const { sound } = await Audio.Sound.createAsync(mySayings[randomSaying])
  await sound.playAsync()
  setTimeout(() => {
    props.navigation.closeDrawer()
  }, 10000);
}

const CustomDrawerContent = (props) => {

  const [circle, setCircle] = useState('me')

  useEffect (() => {
    const checkSplashMode = async () => {
      let splashMode = await AsyncStorage.getItem('SPLASH')
      if ( splashMode === 'me') {
        setCircle('me')
      } else {
        setCircle('amit')
      }
    }
    checkSplashMode()
  },[])

  return (
    <View style={{ flex:1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: '#dde3fe', marginTop:85}}
      >
        <View style={{ padding:20 }}>
          { circle === 'me' ?
            <Image source={Me} style={styles.imageStyle}/>
          :
            <Image source={circleScreens[randomCircle]} style={styles.imageStyle}/>
          }
          <Text style={styles.shoppingText}>
            Shopping List
          </Text>
        </View>
        <View style={{ backgroundColor: '#fff', paddingStart: 30, paddingTop: 30}}>
          <DrawerItem
            icon={() => (
              <FontAwesome name="file-photo-o" size={30} color="black"/>
            )}
            label={' Select SplashScreen'}
            onPress={() => {
              router.push('/selectSplashScreen')
            }}
          />
          <DrawerItem 
            icon={() => (
              <FontAwesome name="database" size={30} color="black"/>
            )}
            label={' Select Storage Mode'}
            onPress={() => {
              router.push('/storageMode')
            }}
          />
          <DrawerItem
            icon={() => (
              <Ionicons name="reload" size={30} color="black"/>
            )}
            label={'Load Initial Data'}
            onPress={() => {
              router.push('/loadInitialData')
            }}
          />
          <DrawerItem
            icon={() => (
              <SimpleLineIcons name="speech" size={30} color="black"/>
            )}
            label={'Give Me A Saying'}
            onPress={() => {
              initiateRandomSaying(props)
            }}
          />
        </View>
      </DrawerContentScrollView>
    </View>
  )
}

const DrawerLayout = () => {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: Dimensions.get('window').width
        }
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      />
    </GestureHandlerRootView>
  )

}

export default DrawerLayout

const styles = StyleSheet.create({
  imageStyle: {
    width: 350,
    height: 300,
    alignSelf: 'center'
  },
  shoppingText: {
    alignSelf: 'center',
    fontWeight: '500',
    fontSize: 22,
    color: '#5363df'
  }
})