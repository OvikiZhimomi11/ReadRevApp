import React from 'react';
import { View, Text, Button } from 'react-native';

const BookDetails = ({ route, navigation }) => {
  const { book } = route.params;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{book.title}</Text>
      <Text>Author: {book.author}</Text>
      <Text>Genre: {book.genre}</Text>
      <Text>Price: {book.isFree ? "Free" : `₹${book.price}`}</Text>

      {book.isFree ? (
        <Button title="Read Now" onPress={() => navigation.navigate('PDFViewer', { pdfUrl: book.downloadURL })} />
      ) : (
        <Button title="Buy Now" onPress={() => alert("Payment integration coming soon!")} />
      )}
    </View>
  );
};

export default BookDetails;
