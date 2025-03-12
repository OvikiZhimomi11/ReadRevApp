import firestore from '@react-native-firebase/firestore';

export const fetchBooks = async () => {
  try {
    const snapshot = await firestore()
    .collection('purchases')
    .where('userId', '==', userId)
    .get();
    return snapshot.docs.map(doc => doc.data().bookId);
  } catch (error) {
    console.error("❌Error fetching books:", error);
    return [];
  }
};
