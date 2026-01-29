import { StyleSheet, Text, View, Pressable } from 'react-native'
import { useCallback, useState  } from 'react'
import { router, useFocusEffect } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AntDesign } from '@expo/vector-icons'
import loadInitialData from '../../initialData'

const loadData = () => {

  const [ dataMode, setDataMode ] = useState('')
  const [ selectedValue, setSelectedValue ] = useState('')

  useFocusEffect (
    useCallback(() => {
      const fetchDmode = async () => {
        const dMode = await AsyncStorage.getItem('DMODE')
        setDataMode(dMode)
        setSelectedValue(dMode)
      }
      fetchDmode()
    }, [] )
  )

  const reloadData = async () => {
    await loadInitialData(dataMode)
    router.back()
  }

  return (
    <>
      <View style={styles.fakeHeader} >
        <Pressable onPress={() => router.back()} style={{marginLeft:20}}> 
          <AntDesign name="arrowleft" size={26} color="black" />
        </Pressable>
        <Text style={{fontSize:20, fontWeight: '500', marginLeft:60}}>Load Initial Data</Text>
      </View>
      <View style={styles.container}>
        <LinearGradient
          colors={['red','blue']}
          style={StyleSheet.absoluteFill}
        />
        <View style={{ width: 280 }}>
          <Text style={styles.textMessage}>
            Please confirm you want to load the initial data from {selectedValue}
          </Text>
        </View> 
        <Pressable style={styles.pressableStyle} onPress={reloadData}>
          <Text style={{color:'white'}}>CONFIRM RELOAD</Text>
        </Pressable>
      </View>
    </>
  )

}

export default loadData

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
  pressableStyle: {
    backgroundColor: '#209a1b', 
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
  textMessage: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  }
})