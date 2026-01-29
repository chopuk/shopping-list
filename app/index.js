import { StyleSheet, Text, View } from 'react-native'
import { Redirect } from 'expo-router'

const index = () => {
  return (
    <Redirect href='/shoppinglist' />
  )
}

export default index

const styles = StyleSheet.create({})