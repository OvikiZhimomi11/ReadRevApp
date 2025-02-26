import firestore from '@react-native-firebase/firestore';

export const fetchBooks = async () => {
  try {
    const snapshot = await firestore().collection('books').limit(10).get();
    const books = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return books;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};
