import React from 'react';
import { View, Text } from 'react-native';
import Pdf from 'react-native-pdf';

const BookPreviewScreen = ({ route }) => {
  const { bookUrl } = route.params; // Pass the download URL of the book to this screen

  return (
    <View style={{ flex: 1 }}>
      <Text>Book Preview</Text>
      <Pdf
        source={{uri: bookUrl, cache:true}}
        onLoadComplete={(numberOfPages,filePath) => {
          console.log(`number of pages: ${numberOfPages}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
      />
    </View>
  );
};

export default BookPreviewScreen;
