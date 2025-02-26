import React, { useState } from 'react';
import { View, Text, Button} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker'; // Use for file selection
import { ref, uploadBytesResumable, getDownloadURL } from '@react-native-firebase/storage';

const UploadScreen = () => {
  const [fileName, setFileName] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Handle file selection
  const selectFile = () => {
    launchImageLibrary({ mediaType: 'document' }, response => {
      if (response.assets) {
        const file = response.assets[0];
        setFileName(file.fileName);
        uploadFile(file.uri, file.fileName);
      }
    });
  };

  // Handle file upload
  const uploadFile = (uri, fileName) => {
    setUploading(true);
    const fileRef = ref(storage, 'books/' + fileName);
    const uploadTask = uploadBytesResumable(fileRef, uri);

    uploadTask.on('state_changed', snapshot => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setUploadProgress(progress);
    }, error => {
      console.error(error);
      setUploading(false);
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
        console.log('File available at', downloadURL);
        setSuccessMessage('Upload successful!');
        setUploading(false);
      });
    });
  };

  return (
    <View>
      <Button title="Select PDF" onPress={selectFile} />
      {fileName && <Text>Selected file: {fileName}</Text>}
      {uploading && <ProgressBarAndroid styleAttr="Horizontal" progress={uploadProgress / 100} />}
      {successMessage && <Text>{successMessage}</Text>}
    </View>
  );
};

export default UploadScreen;
