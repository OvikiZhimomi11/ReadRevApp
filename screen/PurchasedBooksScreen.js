import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { fetchPurchasedBooks } from './fetchPurchasedBooks';

const PurchasedBooksScreen = ({ userId }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const loadBooks = async () => {
      const purchasedBooks = await fetchPurchasedBooks(userId);
      setBooks(purchasedBooks);
    };
    loadBooks();
  }, []);

  return (
    <View>
      <Text>My Purchased Books</Text>
      <FlatList
        data={books}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
    </View>
  );
};

export default PurchasedBooksScreen;
