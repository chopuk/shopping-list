import { StyleSheet, Text, View } from 'react-native'
import { useCallback, useState } from 'react'
import { Divider } from 'react-native-elements'
import { LinearGradient } from 'expo-linear-gradient'
import { useFocusEffect } from 'expo-router'
import updatePositions, { getShoppingItems } from '../data-access'
import { Audio } from 'expo-av'
import DragList from 'react-native-draglist'
import ShoppingItem from './ShoppingItem'
import AsyncStorage from '@react-native-async-storage/async-storage'

const HomeScreen = () => {

  const [ shoppingItems, setShoppingItems] = useState([])
  const [ dataMode, setDataMode ] = useState(null)
  const [ sync, setSync ] = useState(false)
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
      <View style={{marginTop:20}}>
        { !isLoading ?
          <>
          <View></View>
            <View style={{height:600}}>
            <DragList
                data={shoppingItems}
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
            <Divider style={{backgroundColor:'#9bb237',height:3,marginTop:12}} />
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
  }
})