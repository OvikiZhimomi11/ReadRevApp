import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { uploadbook } from "../services/firestoreServices";


const BookUploadScreen = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [price, setPrice] = useState('');
  const [isFree, setIsFree] = useState(false);

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({ type: "application/pdf" });
    if (result.type !== "cancel") {
      setFile(result.URL);
    }
  };

  const handleUpload = async () => {
    if (file && title && author && genre && price) {
      Alert.alert('Error','Please fill all fields and selectt a file');
      return;
    }

    const response = await uploadbook(file,{
       title, 
       author, 
       genre, 
       price: isFree ? 0:price,
       isFree});

       if(response.success){
        Alert.alert('Success','Book uploaded successfully');
       }
       else
       {
        Alert.alert('Error','Failed to upload book');
      }};
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upload Your Book</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Book Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Author"
        value={author}
        onChangeText={setAuthor}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.filePicker} onPress={pickDocument}>
        <Image source={require("../assets/upload-icon.png")} style={styles.icon} />
        <Text style={styles.filePickerText}>{pdfFile ? pdfFile.name : "Select PDF File"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>Upload</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    marginBottom: 15,
    fontSize: 16,
  },
  filePicker: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ddd",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    marginBottom: 20,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  filePickerText: {
    fontSize: 16,
    color: "#333",
  },
  uploadButton: {
    backgroundColor: "#6200EE",
    paddingVertical: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default BookUploadScreen;
