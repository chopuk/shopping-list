import { StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'
import { router, Stack } from 'expo-router'
import SplashScreen from '../../Components/SplashScreen'

const randomSplash = () => {

  const [ isShowSplash, setIsShowSplash] = useState(true)

  useEffect (() => {
    setTimeout(() => {
      setIsShowSplash(false)
    }, 8000)
    setTimeout(() => {
      router.navigate('/shoppinglist')
    }, 8000)
  })

  return (
    <>
      <Stack.Screen options={{title: 'Random Splash'}} />
      { isShowSplash ?
        <SplashScreen />
      :
        null
      }
    </>
  )
}

export default randomSplash

const styles = StyleSheet.create({})