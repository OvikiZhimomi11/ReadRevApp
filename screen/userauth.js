import { getAuth } from '@react-native-firebase/auth';
const auth = getAuth();

if (!auth.currentUser) {
  // Redirect to login
  alert("Please log in to upload a file.");
  return;
}
