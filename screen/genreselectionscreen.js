import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';

// Sample genres list
const genres = [
  { id: '1', name: 'Fiction', icon: 'ios-book' },
  { id: '2', name: 'Non-Fiction', icon: 'ios-bookmark' },
  { id: '3', name: 'Romance', icon: 'ios-heart' },
  { id: '4', name: 'Mystery', icon: 'ios-search' },
  { id: '5', name: 'Fantasy', icon: 'ios-eye' },
  { id: '6', name: 'Science Fiction', icon: 'ios-planet' },
  { id: '7', name: 'Biography', icon: 'ios-person' },
  { id: '8', name: 'History', icon: 'ios-time' },
];

const GenreSelectionScreen = () => {
  const navigation = useNavigation();

  const handleGenrePress = (genreName) => {
    // Navigate to the books listing screen based on selected genre
    navigation.navigate('BooksList', { genre: genreName });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.genreCard} onPress={() => handleGenrePress(item.name)}>
      <Ionicons name={item.icon} size={30} color="#fff" />
      <Text style={styles.genreText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Explore Genres</Text>
      <FlatList
        data={genres}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}  // Adjust columns as needed
        contentContainerStyle={styles.genreList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  genreList: {
    justifyContent: 'space-around',
  },
  genreCard: {
    flex: 1,
    backgroundColor: '#007BFF',
    margin: 8,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // Shadow effect for Android
  },
  genreText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default GenreSelectionScreen;
