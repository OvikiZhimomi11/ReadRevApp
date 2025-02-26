import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getFirestore, collection, getDocs } from '@react-native-firebase/firestore';

const UserProfileScreen = () => {
  const [purchases, setPurchases] = useState([]);
  const userId = 'current-user-id'; // Replace with current logged-in user ID

  useEffect(() => {
    const fetchPurchases = async () => {
      const purchasesCollection = collection(getFirestore(), `users/${userId}/purchases`);
      const purchasesSnapshot = await getDocs(purchasesCollection);
      const purchasesList = purchasesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPurchases(purchasesList);
    };

    fetchPurchases();
  }, [userId]);

  return (
    <View>
      <Text>User Profile</Text>
      <FlatList
        data={purchases}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.bookTitle}</Text>
            <Text>{`Purchased on: ${item.purchaseDate}`}</Text>
            <Text>Download the book from the link below:</Text>
            <Text>{item.downloadURL}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default UserProfileScreen;
