import auth from '@react-native-firebase/auth';

export const signup = async (email, password) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const login = async (email, password) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const logout = async () => {
  try {
    await auth().signOut();
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};
