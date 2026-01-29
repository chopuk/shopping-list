import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useCallback, useState } from 'react'
import { useFocusEffect } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import MyShoppingItem from './MyShoppingItem'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getShoppingItems } from '../data-access'

const ShoppingScreen = () => {

  const [ shoppingItems, setShoppingItems] = useState([])
  const [ dataMode, setDataMode ] = useState(null)
  const [ sync, setSync ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(true)

  useFocusEffect (
    useCallback(() => {
      const fetchShoppingItems = async () => {
        //await loadInitialData()
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

  return (
    <View style={styles.container}>
      <LinearGradient 
        colors={['#a48c4a','#a049a3','#499ba3']}
        style={StyleSheet.absoluteFill}
      />
      <View style={{marginTop:20}}>
        { !isLoading ?
          <>
            <FlatList
              data={shoppingItems}
              renderItem={({ item }) => 
                <MyShoppingItem 
                  item={item}
                  dataMode={dataMode}
                  shoppingItems={shoppingItems}
                  setShoppingItems={setShoppingItems}
                  sync={sync}
                  setSync={setSync}
                />
              }
              keyExtractor={(item) => item.itemName}
              showsVerticalScrollIndicator={false}
              initialNumToRender={120}
            />
          </> : 
            <View>
              <Text style={{fontSize:24}}>Loading, please wait...</Text>
            </View>
          }
      </View>
    </View>
  )
}

export default ShoppingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})