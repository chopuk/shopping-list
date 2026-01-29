import { StyleSheet, Text, View, Pressable, TouchableOpacity, ScrollView, Image } from 'react-native'
import { useCallback, useState, useRef  } from 'react'
import { router, useFocusEffect } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AntDesign } from '@expo/vector-icons'
import Tick from '../../assets/tick.png'

const splashScreens = [
  require('../../assets/splashscreens/amit1.jpg'),
  require('../../assets/splashscreens/amit2.jpg'), 
  require('../../assets/splashscreens/amit3.jpg'),
  require('../../assets/splashscreens/amit4.jpg'),
  require('../../assets/splashscreens/amit5.jpg'),
  require('../../assets/splashscreens/amit6.jpg'),
  require('../../assets/splashscreens/amit7.jpg'),
  require('../../assets/splashscreens/amit8.jpg'),
  require('../../assets/splashscreens/amit9.jpg'),
  require('../../assets/splashscreens/amit10.jpg'),
  require('../../assets/splashscreens/amit11.jpg'),
  require('../../assets/splashscreens/amit12.jpg'),
  require('../../assets/splashscreens/amit13.jpg'),
  require('../../assets/splashscreens/amit14.jpg'),
  require('../../assets/splashscreens/amit15.jpg'),
  require('../../assets/splashscreens/amit16.jpg'),
  require('../../assets/splashscreens/amit17.jpg'),
  require('../../assets/splashscreens/amit18.jpg'),
  require('../../assets/splashscreens/amit19.jpg'),
  require('../../assets/splashscreens/amit20.jpg'),
  require('../../assets/splashscreens/amit21.jpg'),
  require('../../assets/splashscreens/amit22.jpg'),
  require('../../assets/splashscreens/amit23.jpg'),
  require('../../assets/splashscreens/amit24.jpg'),
  require('../../assets/splashscreens/amit25.jpg'),
  require('../../assets/splashscreens/amit26.jpg'),
  require('../../assets/splashscreens/amit27.jpg'),
  require('../../assets/splashscreens/amit28.jpg'),
  require('../../assets/splashscreens/amit29.jpg'),
  require('../../assets/splashscreens/amit30.jpg'),
  require('../../assets/splashscreens/amit31.jpg'),
  require('../../assets/splashscreens/amit32.jpg'),
  require('../../assets/splashscreens/amit33.jpg'),
  require('../../assets/splashscreens/amit34.jpg'),
  require('../../assets/splashscreens/amit35.jpg'),
  require('../../assets/splashscreens/amit36.jpg'),
  require('../../assets/splashscreens/amit37.jpg'),
  require('../../assets/splashscreens/randomAmit.jpg'),
  require('../../assets/me.jpg')
]

const CustomRadioButton = ({ label, selected, onSelect }) => (
  <TouchableOpacity
      style={[styles.radioButton,
      { backgroundColor: selected ? '#209a1b' : '#FFF' }]}
      onPress={onSelect}
  >
      <Text style={[styles.radioButtonText,
      { color: selected ? '#FFF' : '#000' }]}>
          {label}
      </Text>
  </TouchableOpacity>
)

const selectSplashScreen = () => {

  const [ splashMode, setSplashMode ] = useState(null)
  const [ selectedValue, setSelectedValue ] = useState(null)
  const scrollViewRef = useRef(null);

  const scrollToPosition = (index) => {
    
    if ( index === 'amit') {
      scrollViewRef.current?.scrollTo({ x: 0, y: (splashScreens.length-2)*350, animated: true })
    } else if ( index === 'me' ) {
      scrollViewRef.current?.scrollTo({ x: 0, y: (splashScreens.length-1)*350, animated: true })
    } else {
      scrollViewRef.current?.scrollTo({ x: 0, y: index*350, animated: true })
    }
  }
  
  const scrollToRandom = () => {
    scrollViewRef.current?.scrollTo({ x: 0, y: (splashScreens.length-2)*350, animated: true })
  }

  const scrollToMe = () => {
    scrollViewRef.current?.scrollTo({ x: 0, y: (splashScreens.length-1)*350, animated: true })
  }

  useFocusEffect (
    useCallback(() => {
      const fetchSplashMode = async () => {
        const splash = await AsyncStorage.getItem('SPLASH')
        setSplashMode(splash)
        setSelectedValue(splash)
        scrollToPosition(splash)
      }
      fetchSplashMode()
    }, [] )
  )

  const done = async () => {
    router.navigate('/shoppinglist')
  }

  const updateRandomOrMe = async (splashType) => {
    setSplashMode(splashType)
    setSelectedValue(splashType)
    await AsyncStorage.setItem('SPLASH', splashType)
    if ( splashType === 'amit') {
      scrollToRandom()
    } else {
      scrollToMe()
    }
  }

  const updateAmit = async (imageIndex) => {
    setSplashMode(imageIndex)
    setSelectedValue(imageIndex)
    await AsyncStorage.setItem('SPLASH', imageIndex)
  }

  return (
    <>
      <View style={styles.fakeHeader} >
        <Pressable onPress={() => router.back()} style={{marginLeft:20}}> 
          <AntDesign name="arrowleft" size={26} color="black" />
        </Pressable>
        <Text style={{fontSize:20, fontWeight: '500', marginLeft:40}}>Select SplashScreen</Text>
      </View>
      <View style={styles.container}>
        <LinearGradient
          colors={['green','yellow','red']}
          style={StyleSheet.absoluteFill}
        />
        <View style={{height: 470}}>
          <ScrollView
            ref={scrollViewRef}
            horizontal={true}
            decelerationRate={"fast"}
            snapToInterval={350}
            snapToAlignment='center'
            showsHorizontalScrollIndicator={false}
          >
            {splashScreens.map((screen,index) => (
              <View style={{marginHorizontal:10}} key={index}>
                <Pressable onPress={()=> updateAmit(index.toString())}>
                  <View style={styles.imageSize}>
                    <Image 
                        source={screen}
                        style={styles.imageSize}
                    />
                    { index == splashMode ?
                      <Image 
                          source={Tick}
                          style={styles.tick}
                      />
                    :
                      null
                    }
                  </View>
                </Pressable>
              </View>
            ))}
          </ScrollView>
        </View>
        <View>
        <CustomRadioButton
            label='Random Amit'
            selected={selectedValue === 'amit'}
            onSelect={() => updateRandomOrMe('amit')}
        />
        <CustomRadioButton
            label='Me'
            selected={selectedValue === 'me'}
            onSelect={() => updateRandomOrMe('me')}
        />
        </View>
        <Pressable style={styles.pressableStyle} onPress={()=>done()}>
          <Text style={{color:'white'}}>DONE</Text>
        </Pressable>
      </View>
    </>
  )

}

export default selectSplashScreen

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#1d2125', 
    paddingHorizontal:15,
    padding:15,
    borderRadius: 5
  },
  radioButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007BFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 280,
    marginTop: 20
  },
  radioButtonText: {
      fontSize: 16
  },
  pressableStyle: {
    backgroundColor: 'blue', 
    paddingHorizontal:15,
    padding:13,
    marginTop:15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems:'center',
    width:280
  },
  fakeHeader: {
    paddingTop: 46,
    paddingBottom:18,
    backgroundColor: '#6393a6',
    alignItems: 'center',
    flexDirection: 'row'
  },
  imageSize: {
    height: 450,
    width: 330
  },
  tick: {
    height:40,
    width:40,
    position: 'absolute',
    bottom: 0
  }
})