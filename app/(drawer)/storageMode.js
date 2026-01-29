import { StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native'
import { useCallback, useState  } from 'react'
import { router, useFocusEffect } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AntDesign } from '@expo/vector-icons'

const CustomRadioButton = ({ label, selected, onSelect }) => (
  <TouchableOpacity
      style={[styles.radioButton,
      { backgroundColor: selected ? '#007BFF' : '#FFF' }]}
      onPress={onSelect}
  >
      <Text style={[styles.radioButtonText,
      { color: selected ? '#FFF' : '#000' }]}>
          {label}
      </Text>
  </TouchableOpacity>
)

const storageMode = () => {

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

  const updateDataMode = async () => {
    setDataMode(selectedValue)
    await AsyncStorage.setItem('DMODE', selectedValue)
    router.navigate('/shoppinglist')
  }

  return (
    <>
      <View style={styles.fakeHeader} >
        <Pressable onPress={() => router.back()} style={{marginLeft:20}}> 
          <AntDesign name="arrowleft" size={26} color="black" />
        </Pressable>
        <Text style={{fontSize:20, fontWeight: '500', marginLeft:40}}>Select Storage Mode</Text>
      </View>
      <View style={styles.container}>
        <LinearGradient
          colors={['red','blue']}
          style={StyleSheet.absoluteFill}
        />
        <View>
            <CustomRadioButton
                label='LocalStorage'
                selected={selectedValue === 'LocalStorage'}
                onSelect={() => setSelectedValue('LocalStorage')}
            />
            <CustomRadioButton
                label='Firebase'
                selected={selectedValue === 'FireBase'}
                onSelect={() => setSelectedValue('FireBase')}
            />
        </View>
        <Pressable style={styles.pressableStyle} onPress={updateDataMode}>
          <Text style={{color:'white'}}>UPDATE DATA MODE</Text>
        </Pressable>
      </View>
    </>
  )

}

export default storageMode

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
  radioButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#007BFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 280,
  },
  radioButtonText: {
      fontSize: 16,
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
  }
})