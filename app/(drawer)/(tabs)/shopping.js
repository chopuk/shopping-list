import { StyleSheet } from 'react-native'
import { Stack } from 'expo-router'
import ShoppingScreen from '../../../Components/ShoppingScreen'

const index = () => {
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Go Shopping',
          headerRight: () => (
            <>
            </>
          )
        }} 
      />
      <ShoppingScreen />
    </>
  )
}

export default index

const styles = StyleSheet.create({})