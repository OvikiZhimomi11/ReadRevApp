import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

const BooksListScreen = ({ route }) => {
  const { genre } = route.params;
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch books for the selected genre
    const fetchBooks = async () => {
      // Fetch books from local storage, Firebase, or any API based on the genre
      // For this example, we are simulating an API call
      setTimeout(() => {
        const fetchedBooks = [
          { id: '1', title: 'Book 1 in ' + genre, author: 'Author 1' },
          { id: '2', title: 'Book 2 in ' + genre, author: 'Author 2' },
          // Add more books for the genre
        ];
        setBooks(fetchedBooks);
        setLoading(false);
      }, 2000); // Simulate a 2-second delay for fetching data
    };

    fetchBooks();
  }, [genre]);

  const renderBook = ({ item }) => (
    <View style={styles.bookItem}>
      <Text style={styles.bookTitle}>{item.title}</Text>
      <Text style={styles.bookAuthor}>{item.author}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Books in {genre}</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <FlatList
          data={books}
          renderItem={renderBook}
          keyExtractor={(item) => item.id}
        />
      )}
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
  bookItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookAuthor: {
    color: '#777',
  },
});

export default BooksListScreen;
