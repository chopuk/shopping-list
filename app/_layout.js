import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const RootLayout = () => {

  return (
    <>
      <Stack 
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name='updateitem' />
        <Stack.Screen name='(drawer)' />
      </Stack>
      <StatusBar />
    </>
  )
    
}

export default RootLayout