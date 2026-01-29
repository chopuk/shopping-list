import { Alert, Pressable, StyleSheet, Text, View, PanResponder, Animated } from 'react-native'
import updatePositions, { updateItemStatus } from '../data-access'
import { Audio } from 'expo-av'
import { router } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics'

const ShoppingItem = ({info, dataMode, shoppingItems, setShoppingItems, sync, setSync}) => {

  const { item, onDragStart, onDragEnd, isActive} = info
  const translateX = new Animated.Value(0)
  const panResponder =  PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (evt,{dx,dy}) => {
        return Math.abs(dx) > 10 || Math.abs(dy) > 10
        // if (dx > 0 || dy > 0) {
        //   return true;
        // }
        // return false;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx < 0) {
          translateX.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -50) {
          Animated.spring(translateX, {
            toValue: -100,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      }
    })
  
  const toggleList = async () => {
    const items = await updateItemStatus(dataMode, item, shoppingItems)
    setShoppingItems(items)
    setSync(!sync)
    const { sound } = await Audio.Sound.createAsync( require('../assets/sounds/switch.mp3'))
    await sound.playAsync()
  }

  const confirmDeleteItem = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    Alert.alert('Confirmation', 'Are you sure you want to do this?', [
      {
        text: 'No',
        onPress: () => {setSync(!sync)},
        style: 'cancel'
      },
      {text: 'Yes', onPress: () => deleteItem()},
    ])
  }

  const deleteItem = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    const items = await updatePositions(dataMode,item,'delete',shoppingItems)
    setShoppingItems(items)
    setSync(!sync)
    const { sound } = await Audio.Sound.createAsync( require('../assets/sounds/delete.mp3'))
    await sound.playAsync()
  }

  const editItem = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    router.navigate({pathname: '/updateitem', params: { id: item.id, itemName: item.itemName, category: item.category, dataMode: dataMode}}) 
  }

  const startDragging = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    onDragStart()
  } 

  return (
    <View style={styles.viewStyle}>
      <Animated.View
        style={{
          flex: 1,
          transform: [{ translateX: translateX }],
        }}
      >
        <View {...panResponder.panHandlers}>
          <Pressable style={[styles.itemStyle, isActive && {opacity: 0.7}]}
                onPress={toggleList}
                onLongPress={startDragging}
                onPressOut={onDragEnd}>
            <Text style={[styles.textStyle, item.checked ? {opacity: 0.3} : {opacity:1}]}>{item.itemName}</Text>
            <View style={{flexDirection: 'row'}}>
              <Pressable onPress={editItem} style={styles.editButton}> 
                <MaterialIcons name="edit-square" size={30} color="darkgreen" />
              </Pressable>
              <Pressable style={styles.deleteButton} onPress={confirmDeleteItem}>
                <MaterialIcons name="delete" size={30} color="darkred" />
              </Pressable>
            </View>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  )
  
}

export default ShoppingItem

const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center', 
    alignItems: 'center'
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
  },
  deleteButton: {
    position: "absolute",
    right: -110,
    top: -15
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  editButton: {
    position: "absolute",
    right: -60,
    top: -15
  }
})