import { StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'
import { Stack } from 'expo-router'
import HomeScreen from '../../../Components/HomeScreen'
import SplashScreen from '../../../Components/SplashScreen'

const index = () => {

  const [ isShowSplash, setIsShowSplash] = useState(true)

  useEffect (() => {
    setTimeout(() => {
      setIsShowSplash(false)
    },10000)
  })

  return (
    <>
      <Stack.Screen options={{title: 'Shopping List'}} />
      { isShowSplash ?
        <SplashScreen />
      :
        <HomeScreen />
      }
    </>
  )
}

export default index

const styles = StyleSheet.create({})