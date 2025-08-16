import AsyncStorage from '@react-native-async-storage/async-storage'
import { db } from './firebase'
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore'
import { getShoppingItems } from './data-access'

const deleteMe = async(id) => {
  await deleteDoc(doc(db, "shopping-items", id))
}

const loadInitialData = async (dataMode) => {

  const itemsToAdd = [
    'Onions',
    'Grapes',
    'Tomatoes',
    'Mushrooms',
    'Ready Meals',
    'Bacon',
    'Sausages',
    'Chicken Breasts',
    'Chicken Wings And Thighs',
    'Beef Mince',
    'Orange Juice',
    'Milk',
    'Lurpak',
    'Cheese',
    'Toothpaste',
    'Mouth Wash',
    'Deodorant',
    'Liquid Soap',
    'Vegetable Oil',
    'Tinned Beans',
    'Tinned Tomatoes',
    'Soup',
    'Tinned Salmon',
    'Tinned Tuna',
    'Rice',
    'Ketchup',
    'Brown Sauce',
    'Weetabix',
    'Corn Flakes',
    'Water',
    'Coke',
    'Ribena',
    'Long Life Juice',
    'Eggs',
    'Bread',
    'Croissants',
    'Frozen Peas',
    'Ice Lollies',
    'Wine',
    'Whiskey',
    'Cider',
    'Bog Roll',
    'Bum Wipes',
    'Bloo Loos',
    'Fairy Liquid',
    'Marigolds',
    'Tissues',
    'Kitchen Roll',
    'Rennie',
    'Paracetamol',
    'AA Batteries',
    'AAA Batteries',
    'CR8032 Batteries'
  ] 

  let items = []

  switch (dataMode) {
    case 'LocalStorage':
      await AsyncStorage.removeItem('shopping-items')
      for (let i in itemsToAdd) {
        const position = Number(i) + Number(1)
        items.push({
          itemName: itemsToAdd[i],
          itemPosition: position,
          checked: false
        }) 
      }
      await AsyncStorage.setItem('shopping-items', JSON.stringify(items))
      break
    default: // firebase
      items = await getShoppingItems(dataMode)
      items.forEach((item) => {
        deleteMe(item.id)
      })

      for (let i in itemsToAdd) {
          const position = Number(i) + Number(1)
          const docRef = await addDoc(collection(db, "shopping-items"), {
          itemName: itemsToAdd[i],
          itemPosition: position,
          checked: false
          })
        }
      break
  }
        
  return items

}

export default loadInitialData