import AsyncStorage from '@react-native-async-storage/async-storage'
import { db } from './firebase'
import { getDocs, collection, updateDoc, query, doc, deleteDoc, orderBy, addDoc } from 'firebase/firestore'
import { capitalizeItem } from './utils'

const updateMe = async(updateRef, position ) => {
  await updateDoc(updateRef, {
        itemPosition: position
  })
}

const updatePositions = async ( dataMode, item, action, shoppingItems, startPosition, endPosition ) => {
  if (action === 'delete') {
    switch (dataMode) {
      case 'LocalStorage':
        // get all items that need their position changing..
        const filteredItems = shoppingItems.filter(x => x.itemPosition > item.itemPosition)
        filteredItems.forEach((fitem) => {
          const index = shoppingItems.findIndex(x => x.itemName === fitem.itemName)
          shoppingItems[index].itemPosition = shoppingItems[index].itemPosition - 1
        })
        // remove deleted shopping item
        const newShoppingList  = shoppingItems.filter(x => x.itemName !==  item.itemName)
        await AsyncStorage.setItem('shopping-items', JSON.stringify(newShoppingList))
        return newShoppingList
      default: // firebase
        // get all items that need their position changing..
        const filteredList = shoppingItems.filter(x => x.itemPosition > item.itemPosition)
        filteredList.forEach((fitem) => {
          const index = shoppingItems.findIndex(x => x.itemName === fitem.itemName)
          shoppingItems[index].itemPosition = shoppingItems[index].itemPosition - 1
        })
        filteredList.forEach((item) => {
          const updateRef = doc(db, "shopping-items", item.id)
          updateMe(updateRef, item.itemPosition)
        })   
        await deleteDoc(doc(db, "shopping-items", item.id))
        // remove deleted shopping item
        const newList  = shoppingItems.filter(x => x.itemName !==  item.itemName)
        return newList
      }
  } else { // drag
      // convert drag positions to reflect the itemPostion field in the database
      const startItemPosition = startPosition+1
      const endItemPosition = endPosition+1
      switch (dataMode) {
        case 'LocalStorage':
          if (startPosition > endPosition) {
            // drag up
            const filteredItems = shoppingItems.filter(x => 
                                    x.itemPosition < startItemPosition && 
                                    x.itemPosition >= endItemPosition )
            filteredItems.forEach((fitem) => {
              const index = shoppingItems.findIndex(x => x.itemName === fitem.itemName)
              shoppingItems[index].itemPosition = shoppingItems[index].itemPosition + 1
            })
          } else {
            // drag down
            const filteredItems = shoppingItems.filter(x => 
                                    x.itemPosition > startItemPosition && 
                                    x.itemPosition <= endItemPosition )
            filteredItems.forEach((fitem) => {
              const index = shoppingItems.findIndex(x => x.itemName === fitem.itemName)
              shoppingItems[index].itemPosition = shoppingItems[index].itemPosition - 1
            })
          }
          // update dragged item
          const index = shoppingItems.findIndex(x => x.itemName === item.itemName)
          shoppingItems[index].itemPosition = endItemPosition
          await AsyncStorage.setItem('shopping-items', JSON.stringify(shoppingItems))
          break
        default: // firebase
          if (startPosition > endPosition) {
            // drag up
            const itemsToUpdate = shoppingItems.filter(x => 
              x.itemPosition < startItemPosition && 
              x.itemPosition >= endItemPosition )
            // update positions
            itemsToUpdate.forEach((item) => {
              const updateRef = doc(db, "shopping-items", item.id)
              updateMe(updateRef, item.itemPosition+1)
            })
            // update dragged item
            const updateRef = doc(db, "shopping-items", item.id)
            await updateDoc(updateRef, {
              itemPosition: endItemPosition
            })
          } else {
              // drag down
              const itemsToUpdate = shoppingItems.filter(x => 
                x.itemPosition > startItemPosition && 
                x.itemPosition <= endItemPosition )
              // update positions
              itemsToUpdate.forEach((item) => {
                const updateRef = doc(db, "shopping-items", item.id)
                updateMe(updateRef, item.itemPosition-1)
              })
              // update dragged item
              const updateRef = doc(db, "shopping-items", item.id)
              await updateDoc(updateRef, {
                itemPosition: endItemPosition
              })
            }
        }
  }
}

export default updatePositions

export const isItemPresent = async (itemName, shoppingItems) => {
  //see if the itemName is already in the present...
  let items = []
  const modifiedItem = capitalizeItem(itemName)
  const index = shoppingItems.findIndex(x => x.itemName === modifiedItem)
  if ( index > 0 ) { items.push(shoppingItems[index]) }
  if  ( items.length > 0)  {
    return true
  } else {
    return false
  }
}

export const getShoppingItems = async (dataMode) => {
  let items = []
  switch (dataMode) {
    case 'LocalStorage':
      items = await AsyncStorage.getItem('shopping-items')
      items = JSON.parse(items)
      items.sort((a,b) => a.itemPosition - b.itemPosition)
      return items
    default: // firebase
      const q = query(collection(db, 'shopping-items'), orderBy('itemPosition'))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id })
      })
      return items
  }
}

export const updateItemStatus = async (dataMode, item, shoppingItems) => {
  const { id, itemName, checked } = item
  switch (dataMode) {
    case 'LocalStorage':
      const index = shoppingItems.findIndex(x => x.itemName === itemName)
      shoppingItems[index].checked = !checked
      await AsyncStorage.setItem('shopping-items', JSON.stringify(shoppingItems))
      return shoppingItems
    default: // firebase
      const updateRef = doc(db, "shopping-items", id)
      await updateDoc(updateRef, {
        checked: !checked
      })
      const ind = shoppingItems.findIndex(x => x.itemName === itemName)
      shoppingItems[ind].checked = !checked
      return shoppingItems
  }
}

export const addNewItemToList = async(dataMode, newItem, newCategory, shoppingItems) => {
  const modifiedItem = capitalizeItem(newItem)

  switch (dataMode) {
    case 'LocalStorage':
      // get maximum item position
      const maxPositionObject = shoppingItems.reduce((previous, current) => {
        return current.itemPosition > previous.itemPosition ? current : previous
      })
      shoppingItems.push({
        itemName: modifiedItem.trim(),
        category: newCategory,
        itemPosition: Number(maxPositionObject.itemPosition) + 1,
        checked: false
      })
      await AsyncStorage.setItem('shopping-items', JSON.stringify(shoppingItems))
      break
    default: // firebase
      // get maximum item position
      const maxPositionObj = shoppingItems.reduce((previous, current) => {
        return current.itemPosition > previous.itemPosition ? current : previous
      })
      const docRef = await addDoc(collection(db, "shopping-items"), {
        itemName: modifiedItem.trim(),
        category: newCategory,
        itemPosition: Number(maxPositionObj.itemPosition) + 1,
        checked: false
      })
      break
  }
  
}

export const updateItem = async (dataMode, oldItemName, itemName, category, id, shoppingItems)  => {

  const modifiedItem = capitalizeItem(itemName)

  switch (dataMode) {
    case 'LocalStorage':
      const index = shoppingItems.findIndex(x => x.itemName === oldItemName)
      shoppingItems[index].itemName = modifiedItem
      shoppingItems[index].category = category
      await AsyncStorage.setItem('shopping-items', JSON.stringify(shoppingItems))
      break
    default: // firebase
      const updateRef = doc(db, "shopping-items", id)
      await updateDoc(updateRef, {
        itemName: modifiedItem,
        category: category
      })
      break
  }

}