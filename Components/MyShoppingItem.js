import { Pressable, StyleSheet, Text, View } from 'react-native'
import { updateItemStatus } from '../data-access'
import { Audio } from 'expo-av'
import { FontAwesome } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics'

const MyShoppingItem = ({item, dataMode, shoppingItems, setShoppingItems, sync, setSync}) => {

  const markAsDone = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    const items = await updateItemStatus(dataMode, item, shoppingItems)
    setShoppingItems(items)
    setSync(!sync)
    const { sound } = await Audio.Sound.createAsync( require('../assets/sounds/complete.mp3'))
    await sound.playAsync()
  }

  if (item.checked === true) {
    return (
      <View style={styles.viewStyle}>
          <Pressable style={styles.itemStyle} 
                onPress={()=>{}} 
                onLongPress={markAsDone}>
            <Text style={styles.textStyle}>{item.itemName}</Text>
            <View style={{flexDirection: 'row'}}>
              <Pressable onLongPress={markAsDone} style={{marginRight:1}}> 
                <FontAwesome name="check-square-o" size={20} color="green" />
              </Pressable>
            </View>
          </Pressable>
      </View>
    )
  } else {
    return null
  }
  
}

export default MyShoppingItem

const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center', 
    alignItems: 'center',
  },
  itemStyle: {
    backgroundColor: '#1d2125', 
    paddingHorizontal:15,
    padding:10,
    marginBottom:4,
    width: '99%',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  textStyle: {
    color: 'white',
    fontSize: 14
  }
})