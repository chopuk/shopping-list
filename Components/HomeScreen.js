import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useCallback, useEffect, useRef, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useFocusEffect } from 'expo-router'
import updatePositions, { getShoppingItems } from '../data-access'
import { Audio } from 'expo-av'
import DragList from 'react-native-draglist'
import ShoppingItem from './ShoppingItem'
import AsyncStorage from '@react-native-async-storage/async-storage'

const HomeScreen = () => {

  const [ shoppingItems, setShoppingItems ] = useState([])
  const [ dataMode, setDataMode ] = useState(null)
  const [ sync, setSync ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(true)
  const [ searchText, setsearchText ] = useState('')

  const filteredItems = shoppingItems.filter(item =>
    String(item.itemName).toLowerCase().trim().includes(searchText.toLowerCase().trim()) 
    || String(item.category).toLowerCase().trim().includes(searchText.toLowerCase().trim())
  )

  const checkSearchText = (text) => {
    if (String(text).toLowerCase().trim() === 'meet') {
      setsearchText('Meat')
    } else {
      setsearchText(text)
    }
  }

  const clearSearch = () => setsearchText('')

  const timeoutRef = useRef(null)

  const handleFocus = () => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    // Set a new timeout to dismiss the keyboard after 5000ms (5 seconds)
    timeoutRef.current = setTimeout(() => {
      Keyboard.dismiss()
    }, 5000);
  };

  const handleBlur = () => {
    // Clear the timeout if the input loses focus before the timer expires
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  }, [])

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
    }, [sync] )
  )

  const onReordered = async (fromIndex, toIndex) => {
    await updatePositions(dataMode,shoppingItems[fromIndex],'drag',shoppingItems,fromIndex, toIndex)
    setSync(!sync)
    const { sound } = await Audio.Sound.createAsync( require('../assets/sounds/move.mp3'))
    await sound.playAsync()
  }

  return (
    <View style={styles.container}>
      <LinearGradient 
        colors={['#a48c4a','#a049a3','#499ba3']}
        style={StyleSheet.absoluteFill}
      />
      <View style={{marginTop:10}}>
        { !isLoading ?
          <>
            <View style={{flex: 1}}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Filter by name or category..."
                  value={searchText}
                  onChangeText={(text)=>checkSearchText(text)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                {searchText.length > 0 && (
                  <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
                    <Text style={styles.clearText}>✕</Text>
                  </TouchableOpacity>
                )}
              </View>
              <View style={{marginBottom: 52}}>
              <DragList
                  data={filteredItems}
                  renderItem={(info) => 
                    <ShoppingItem 
                      info={info} 
                      dataMode={dataMode}
                      shoppingItems={shoppingItems}
                      setShoppingItems={setShoppingItems}
                      sync={sync}
                      setSync={setSync}
                    />
                  }
                  keyExtractor={(item) => item.itemName}
                  onReordered={onReordered}
              />
              </View>
            </View>
          </> : 
            <View>
              <Text style={{fontSize:24, marginTop:300}}>Loading, please wait...</Text>
            </View>
          }
      </View>
    </View>
  )

}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  pressableStyle: {
    backgroundColor: '#209a1b', 
    paddingHorizontal:15,
    padding:13,
    marginTop: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems:'center'
  },
  searchButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    marginRight: 7,
    marginLeft:2,
    borderRadius:5,
    marginVertical:5,
    paddingVertical:5
  },
  input: {
    backgroundColor: '#20c3f5ff',
    padding: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#336a83ff',
    paddingRight: 40, // Space for the clear button
    marginRight: 7,
    marginLeft: 3
  },
  inputContainer: {
    marginBottom: 10
  },
  clearButton: {
    position: 'absolute',
    right:15,
    top: 3,
    padding: 4
  },
  clearText: {
    fontSize: 18,
    color: '#120b3dff'
  }
})