import { StyleSheet, View } from 'react-native';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Chat from './components/Chat';

export default function App() {
  return (
    <View style={styles.container}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/chat" element={<Chat/>}/>
        </Routes>
      </BrowserRouter>
    </View>
  );
}

const styles = StyleSheet.create({
  /*container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },*/
});
