import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchFreeBooks } from 'fetchBooks';
import { useNavigation } from '@react-navigation/native';

const freeBooks = [
  { id: '1', title: 'The Great Adventure', genre: 'Fiction', file: 'great_adventure.pdf' },
  { id: '2', title: 'History of Ancient India', genre: 'History', file: 'ancient_india.pdf' },
  { id: '3', title: 'Python for Beginners', genre: 'Technology', file: 'python_basics.pdf' },
  { id: '4', title: 'The Mystery Novel', genre: 'Fiction', file: 'mystery_novel.pdf' },
  { id: '5', title: 'Space Exploration', genre: 'Science', file: 'space_exploration.pdf' },
];

// Group books by genre
const groupedBooks = freeBooks.reduce((acc, book) => {
  acc[book.genre] = acc[book.genre] || [];
  acc[book.genre].push(book);
  return acc;
}, {});

const FreeBooksScreen = () => {
  const navigation = useNavigation();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBooks = async () => {
      const data = await fetchFreeBooks();
      setBooks(data);
      setLoading(false);
    };
    getBooks();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="blue" />;

  const openBook = (book) => {
    navigation.navigate('PDFViewer', { file: book.file, title: book.title });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Free Books</Text>
      <FlatList
        data={Object.keys(groupedBooks)}
        keyExtractor={(item) => item}
        renderItem={({ item: genre }) => (
          <View style={styles.genreContainer}>
            <Text style={styles.genreTitle}>{genre}</Text>
            {groupedBooks[genre].map((book) => (
              <TouchableOpacity key={book.id} style={styles.bookItem} onPress={() => openBook(book)}>
                <Text style={styles.bookTitle}>{book.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
    </View>
  );
};

export default FreeBooksScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  header: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  genreContainer: { marginBottom: 15 },
  genreTitle: { fontSize: 18, fontWeight: 'bold', color: '#007bff', marginBottom: 5 },
  bookItem: { backgroundColor: '#ffffff', padding: 10, borderRadius: 8, marginBottom: 5, elevation: 2 },
  bookTitle: { fontSize: 16 },
});