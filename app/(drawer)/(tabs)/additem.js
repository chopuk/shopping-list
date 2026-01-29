import { StyleSheet, TextInput, View, Pressable, Text, Alert } from 'react-native'
import { useCallback, useState } from 'react'
import { useFocusEffect } from 'expo-router'
import { router, Stack } from 'expo-router'
import { addNewItemToList, getShoppingItems, isItemPresent } from '../../../data-access'
import { LinearGradient } from 'expo-linear-gradient'
import { Audio } from 'expo-av'
import * as Haptics from 'expo-haptics'
import AsyncStorage from '@react-native-async-storage/async-storage'

const addItem = () => {

  const [ newItem, setNewItem ] = useState('')
  const [ newCategory, setNewCategory ] = useState('')
  const [ shoppingItems, setShoppingItems] = useState([])
  const [ dataMode, setDataMode ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(true)

  useFocusEffect (
    useCallback(() => {
      const fetchShoppingItems = async () => {
        const dMode = await AsyncStorage.getItem('DMODE')
        if ( dMode !== null) {
          setDataMode(dMode)
        } else {
            await AsyncStorage.setItem('DMODE', 'LocalStorage')
            setDataMode('LocalStorage')
        }
        const items = await getShoppingItems(dMode)
        setShoppingItems(items)
        setIsLoading(false)
      } 
      fetchShoppingItems()
    }, [] )
  )

  const validateInput = async () => {

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    if ( newItem.length == 0 ) {
      Alert.alert('Error', 'You Must Enter A Value', [
        {
          text: 'Ok',
          onPress: () => {},
          style: 'cancel'
        }
      ])
    } else {
      itemExists = await isItemPresent(newItem,shoppingItems)

      if (itemExists) {
        Alert.alert('Error', 'That item already exists', [
          {
            text: 'Ok',
            onPress: () => {},
            style: 'cancel'
          }
        ])
      } else {
        addNewItem()
      }
    }

  }

  const addNewItem = async () => {
    await addNewItemToList(dataMode,newItem,newCategory,shoppingItems)
    const { sound } = await Audio.Sound.createAsync( require('../../../assets/sounds/add.mp3'))
    await sound.playAsync()
    setNewItem('')
    router.back()
  }

  return (
    <>
      <Stack.Screen
        options={{ 
          title: 'Add Item',
          headerRight: () => (
            <>
            </>
          )
        }}
      />
      <View style={styles.container}>
        <LinearGradient 
          colors={['#a48c4a','#a049a3','#499ba3']}
          style={StyleSheet.absoluteFill}
        />
        <View>
          { !isLoading ?
          <>
            <TextInput
              value={newItem}
              onChangeText={setNewItem}
              textAlign='center'
              style={styles.inputStyle}
            />
            <TextInput
              value={newCategory}
              onChangeText={setNewCategory}
              textAlign='center'
              style={styles.inputStyle}
            />
            <Pressable style={styles.pressableStyle} onPress={validateInput}>
              <Text style={{color:'white'}}>ADD ITEM</Text>
            </Pressable>
          </>
          : 
          <View>
            <Text style={{fontSize:24, marginTop:70}}>Loading, please wait...</Text>
          </View>
          } 
        </View>
      </View> 
    </>
  )

}

export default addItem

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
  inputStyle: {
    color:'white',
    padding:10,
    backgroundColor:'#595f33',
    borderRadius: 5,
    marginVertical:10,
    width:300
  },
  pressableStyle: {
    backgroundColor: '#209a1b', 
    paddingHorizontal:15,
    padding:13,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems:'center',
    width:300
  }
})