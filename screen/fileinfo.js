import { getFirestore, doc, setDoc } from '@react-native-firebase/firestore';

const saveFileToDatabase = async (downloadURL, fileName) => {
  const firestore = getFirestore();
  await setDoc(doc(firestore, 'books', fileName), {
    name: fileName,
    url: downloadURL,
    uploadDate: new Date(),
  });
  console.log('File saved to database');
};
