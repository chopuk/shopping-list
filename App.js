import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import HomeScreen from './Components/HomeScreen'
import { LinearGradient } from 'expo-linear-gradient'

export default function App() {
  return (
    <View style={styles.container}>
      <LinearGradient 
        colors={['red','blue']}
        style={StyleSheet.absoluteFill}
      />
      <HomeScreen />
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
