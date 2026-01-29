import AsyncStorage from '@react-native-async-storage/async-storage'
import { db } from './firebase'
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore'
import { getShoppingItems } from './data-access'

const deleteMe = async(id) => {
  await deleteDoc(doc(db, "shopping-items", id))
}

const loadInitialData = async (dataMode) => {

  const itemsToAdd = [

    {
      itemName: 'Onions',
      category: 'Vegetables',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Tomatoes',
      category: 'Vegetables',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Carrots',
      category: 'Vegetables',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Pack of Veg',
      category: 'Vegetables',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Cauliflower',
      category: 'Vegetables',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Garlic Bulb',
      category: 'Vegetables',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Mushrooms',
      category: 'Vegetables',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Baked Potato',
      category: 'Vegetables',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Bacon',
      category: 'Meat',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Sausages',
      category: 'Meat',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Small Chicken',
      category: 'Meat,Chicken',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Chicken Breasts',
      category: 'Meat,Chicken',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Chicken Wings',
      category: 'Meat,Chicken',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Chicken and Mushroom Pie',
      category: 'Meat,Chicken,Meal',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Beef Mince',
      category: 'Meat',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Gherkins',
      category: 'Vegetables',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Milk',
      category: 'Dair,Drinks',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Cheese',
      category: 'Dairy',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Cheese Slices',
      category: 'Dairy',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Lurpak',
      category: 'Dairy',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Yogurts',
      category: 'Dairy',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Orange Juice',
      category: 'Drinks',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Ham',
      category: 'Meat',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Ready Meals',
      category: 'Meal',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Pizza',
      category: 'Meal',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Garlic Bread',
      category: 'Bread',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Toothpaste',
      category: 'Body',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Mouth Wash',
      category: 'Body',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Dental Floss',
      category: 'Body',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Spectacle Wipes',
      category: 'Cleaning',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Deordorant',
      category: 'Body',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Shower Gel',
      category: 'Body',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Razors',
      category: 'Body',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Liquid Soap',
      category: 'Body',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Vegetable Oil',
      category: 'Oil',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Olive Oil',
      category: 'Oil',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Baked Beans',
      category: 'Tinned',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Tinned Tomatoes',
      category: 'Tinned',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Soup',
      category: 'Tinned,Soup',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Packet Soup',
      category: 'Soup',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Tinned Salmon',
      category: 'Tinned,Fish',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Tinned Tuna',
      category: 'Tinned,Fish',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Tinned Mackerel',
      category: 'Tinned,Fish',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Spam',
      category: 'Tinned,Meat',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Rice',
      category: '',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Gravy',
      category: '',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Ketchup',
      category: 'Condiments',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Mayonnaise',
      category: 'Condiments',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Salad Cream',
      category: 'Condiments',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Chocolate',
      category: 'Snacks',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Tea',
      category: 'Drinks',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Coffee',
      category: 'Coffee,Drinks',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Coffeemate',
      category: 'Coffee,Drinks,Milk',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Cornflakes',
      category: 'Cereal',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Weekabix',
      category: 'Cereal',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Crisps',
      category: 'Snacks',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Nuts',
      category: 'Snacks',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Water',
      category: 'Drinks',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Coke',
      category: 'Drinks',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Fanta',
      category: 'Drinks',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Ribena',
      category: 'Drinks',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Long Life Juice',
      category: 'Drinks',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Eggs',
      category: '',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Hermesetas',
      category: 'Condiments',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Spaghetti',
      category: '',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Bread',
      category: 'Bread',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Rolls',
      category: 'Bread',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Baguette',
      category: 'Bread',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Croissants',
      category: 'Bread',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Frozen Garlic Bread',
      category: 'Bread,Frozen',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Ice Lollies',
      category: 'Frozen',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Ice Cream',
      category: 'Frozen',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Petite Pois',
      category: 'Frozen,Vegetables',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Chips',
      category: 'Frozen,Vegetables',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Onion Rings',
      category: 'Frozen,Vegetables',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Burgers',
      category: 'Frozen,Meat',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Frozen Fish',
      category: 'Frozen,Fish',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Wine',
      category: 'Alcohol,Drinks',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Whisky',
      category: 'Alcohol,Drinks',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Cider',
      category: 'Alcohol,Drinks',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Lager',
      category: 'Alcohol,Drinks',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Napkins',
      category: '',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Bog Roll',
      category: 'Bathroom',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Bum Wipes',
      category: 'Bathroom',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Bloo Loos',
      category: 'Bathroom',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Bleach',
      category: 'Bathroom',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Toilet Gel',
      category: 'Bathroom',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Air Freshener',
      category: '',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Washing Up Liquid',
      category: 'Kitchen',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Thick Sponges',
      category: 'Kitchen',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Marigolds',
      category: 'Kitchen',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Pledge',
      category: 'Cleaning',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Mould Spray',
      category: 'Cleaning',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Floor Wipes',
      category: 'Cleaning',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Laundry Liquid',
      category: 'Washing',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Laundry Fabric Softener',
      category: 'Washing',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Bin Liners',
      category: 'Kitchen',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Kitchen Foil',
      category: 'Kitchen',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Kitchen Roll',
      category: 'Kitchen',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Food Bags',
      category: 'Kitchen',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Tissues',
      category: '',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Rennie',
      category: 'Medicines',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Liquid Gaviscon',
      category: 'Medicines',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Paracetomol',
      category: 'Medicines',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'Skin Cream',
      category: 'Medicines',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'AA Batteries',
      category: 'Batteries',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'AAA Batteries',
      category: 'Batteries',
      itemPosition: 0,
      checked: false
    },
    {
      itemName: 'CR2032 Batteries',
      category: 'Batteries',
      itemPosition: 0,
      checked: false
    }

  ]
 
  let items = []

  switch (dataMode) {
    case 'LocalStorage':
      await AsyncStorage.removeItem('shopping-items')
      for (let i in itemsToAdd) {
        const position = Number(i) + Number(1)
        items.push({
          itemName: itemsToAdd[i].itemName,
          category: itemsToAdd[i].category,
          itemPosition: position,
          checked: itemsToAdd[i].checked
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
            itemName: itemsToAdd[i].itemName,
            category: itemsToAdd[i].category,
            itemPosition: position,
            checked: itemsToAdd[i].checked
          })
        }
    break
  }
        
  return items

}

export default loadInitialData