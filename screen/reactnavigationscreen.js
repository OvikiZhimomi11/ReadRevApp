import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GenreSelectionScreen from './GenreSelectionScreen';
import BooksListScreen from './BooksListScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GenreSelection">
        <Stack.Screen name="GenreSelection" component={GenreSelectionScreen} />
        <Stack.Screen name="BooksList" component={BooksListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
