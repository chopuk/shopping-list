import { StyleSheet, TextInput, View, Pressable, Text, Alert } from 'react-native'
import { useEffect, useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { getShoppingItems, isItemPresent, updateItem } from '../data-access'
import { LinearGradient } from 'expo-linear-gradient'
import { Audio } from 'expo-av'
import * as Haptics from 'expo-haptics'
import { AntDesign } from '@expo/vector-icons'

const UpdateScreen = () => {

  const { itemName, category, id, dataMode } = useLocalSearchParams()
  const [ newName, setNewName ] = useState('')
  const [ originalName, setOriginalName ] = useState('')
  const [ newCategory, setNewCategory ] = useState('')
  const [ shoppingItems, setShoppingItems] = useState([])
  const [ isLoading, setIsLoading ] = useState(true)

  useEffect(()=> {
    setNewName(itemName)
    setOriginalName(itemName)
    setNewCategory(category)
    const fetchShoppingItems = async () => {
      const items = await getShoppingItems(dataMode)
      setShoppingItems(items)
      setIsLoading(false)
    }
    fetchShoppingItems()
  },[])

  const checkItemExists = async() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    itemExists = await isItemPresent(newName,shoppingItems)
    if (itemExists && originalName !== newName ) {
      Alert.alert('Error', 'That item already exists', [
        {
          text: 'Ok',
          onPress: () => {},
          style: 'cancel'
        }
      ])
    } else {
      updateItemName()
    }
  }

  const updateItemName = async () => {
    await updateItem(dataMode, itemName, newName, newCategory, id, shoppingItems)
    const { sound } = await Audio.Sound.createAsync( require('../assets/sounds/add.mp3'))
    await sound.playAsync()
    router.back()
  }

  return (
    <>
      <Stack.Screen
        options={{ 
          title: 'Update Item Description',
          headerRight: () => (
            <>
            </>
          )
        }}
      />
      <View style={styles.fakeHeader} >
        <Pressable onPress={() => router.back()} style={{marginLeft:20}}> 
          <AntDesign name="arrowleft" size={26} color="black" />
        </Pressable>
        <Text style={{fontSize:20, fontWeight: '500', marginLeft:40}}>Update Item Description</Text>
      </View>
      <View style={styles.container}>
        <LinearGradient
          colors={['red','blue']}
          style={StyleSheet.absoluteFill}
        />
        <View>
          { !isLoading ?
          <>
            <TextInput
              value={newName}
              onChangeText={setNewName}
              textAlign='center'
              style={styles.inputStyle}
            />
            <TextInput
              value={newCategory}
              onChangeText={setNewCategory}
              textAlign='center'
              style={styles.inputStyle}
            />
            <Pressable style={styles.pressableStyle} onPress={checkItemExists}>
              <Text style={{color:'white'}}>UPDATE ITEM</Text>
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

export default UpdateScreen

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
  },
  fakeHeader: {
    paddingTop: 46,
    paddingBottom:18,
    backgroundColor: '#6393a6',
    flexDirection: 'row',
    alignItems: 'center'
  }
})