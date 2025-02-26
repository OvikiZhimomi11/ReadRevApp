import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Pdf from 'react-native-pdf';

const PDFViewer = ({ route }) => {
  const { file } = route.params; // file should be a direct URL or local path

  const pdfSource = file.startsWith('http') 
    ? { uri: file, cache: true }  // If it's a URL (Firebase Storage or API)
    : { uri: `file://${file}`, cache: true }; // If it's a local file

  return (
    <View style={styles.container}>
      <Pdf
        source={pdfSource}
        style={styles.pdf}
        onLoadProgress={() => <ActivityIndicator size="large" color="blue" />}
        onError={(error) => console.log('PDF Error:', error)}
      />
    </View>
  );
};

export default PDFViewer;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  pdf: { flex: 1, width: '100%', height: '100%' },
});

