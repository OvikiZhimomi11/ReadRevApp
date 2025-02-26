import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const uploadbook = async (fileUrl, bookDetails) => {
  try{
    const storageRef = storage().ref('books');
    const fileName = fileUrl.substring(fileUrl.lastIndexOf('/')+1);

    //upload file
    const uploadTask = storageRef.child(fileName).putFile(fileUrl);

    //wait for upload to complete
    await task;

    // Get download URL
    const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();

    // store book details in firestore
    await firestore().collection('books').add({
      title: bookDetails.title,
      author: bookDetails.author,
      genre: bookDetails.genre,
      price: bookDetails.price,//0 if free
      downloadURL,
      isFree: bookDetails.isFree,
    });

    return { success: true, downloadURL};
  }
  catch (error) {
    console.error('Error uploading book:', error);
    return {success: false,error};
  }
}
export const saveUserData = async (user) => {
  try {
    await firestore().collection('users').doc(user.uid).set({
      email: user.email,
      walletBalance: 0,
      subscriptionStatus: 'free',
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const getUserData = async (uid) => {
  try {
    const userDoc = await firestore().collection('users').doc(uid).get();
    return userDoc.data();
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export { uploadbook };
