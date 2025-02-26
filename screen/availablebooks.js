import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { getFirestore, collection, getDocs } from '@react-native-firebase/firestore';

const BrowseBooksScreen = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const booksCollection = collection(getFirestore(), 'availableBooks');
      const booksSnapshot = await getDocs(booksCollection);
      const booksList = booksSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(booksList);
    };

    fetchBooks();
  }, []);

  const handlePurchase = (book) => {
    // Implement payment gateway here (e.g., Stripe or PayPal)
    alert(`Purchasing ${book.title}`);
    // On successful payment, allow the user to download the book
  };

  return (
    <View>
      <Text>Available Books</Text>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.author}</Text>
            <Text>{`$${item.price}`}</Text>
            <Button title="Buy" onPress={() => handlePurchase(item)} />
          </View>
        )}
      />
    </View>
  );
};

export default BrowseBooksScreen;
