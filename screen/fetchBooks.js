import firestore from '@react-native-firebase/firestore';

export const fetchFreeBooks = async () => {
  try {
    const booksCollection = await firestore()
      .collection('books')
      .where('isFree', '==', true) // Fetch only free books
      .get();

    const books = booksCollection.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return books;
  } catch (error) {
    console.error('Error fetching free books:', error);
    return [];
  }
};
