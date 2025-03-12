// HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { fetchBooks } from './fetchBooks';

const HomeScreen = () => {
  const [books, setBooks] = useState([]);
  const auth = getAuth();
  const navigation = useNavigation();

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    const fetchedBooks = await fetchBooks();
    setBooks(fetchedBooks);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login');
      })
      .catch((error) => {
        console.error('Logout Error:', error);
      });
  };

  const categories = ['Fiction', 'Non-Fiction', 'Mystery', 'Sci-Fi', 'Fantasy', 'Biography'];

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to ReadRev!</Text>
      <Text style={styles.sectionTitle}>Categories</Text>
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Text style={styles.category}>{item}</Text>}
      />
      <Text style={styles.sectionTitle}>Books</Text>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => navigation.navigate('BookDetails', { book: item })}>
            <View style={styles.bookItem}>
              <Text style={styles.bookTitle}>{item.title}</Text>
              <Text style={styles.bookCategory}>{item.category}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  category: {
    backgroundColor: '#4A90E2',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  bookItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookCategory: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;