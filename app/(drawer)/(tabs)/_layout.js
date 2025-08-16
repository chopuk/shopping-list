import { Tabs } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons'

const TabsLayout = () => {

  return (
    <>
      <Tabs  
        screenOptions={{
            headerStyle: {
              backgroundColor: '#6393a6'
            },
            headerTitleAlign: 'center',
            tabBarStyle: {
              backgroundColor: 'black',
              paddingTop: 5,
              paddingBottom:5,
              marginBottom: 12,
              height:57
            },
            //tabBarShowLabel: false,
            tabBarLabelStyle: {
              fontSize: 14
            }
          }}
          >
          <Tabs.Screen
              name="shoppinglist"
              options={{
                tabBarIcon: ({ focused }) => (
                  <FontAwesome name='list' size={20} color={focused ? "blue" : "gray"} />
                ),
                title: 'Shopping List'
              }}
          />
          <Tabs.Screen
            name="additem"
            options={{
              tabBarIcon: ({ focused }) => (
                <FontAwesome6 name='add' size={20} color={focused ? "blue" : "gray"} />
              ),
              title: 'Add Item'
            }}
          />
          <Tabs.Screen
              name="shopping"
              options={{
                tabBarIcon: ({ focused }) => (
                  <FontAwesome name='shopping-basket' size={20} color={focused ? "blue" : "gray"} />
                ),
                title: 'Go Shopping'
              }}
          />
      </Tabs>
      <StatusBar />
    </>
  )
    
}

export default TabsLayout