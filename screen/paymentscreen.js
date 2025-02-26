import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import RazorpayCheckout from "react-native-razorpay";
import { firestore } from "../firebase"; // Import Firebase
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import axios from 'axios';

const PaymentScreen = ({ route }) => {
  const { book } = route.params; // Get book details (price)
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);

    var options = {
      description: `Payment for ${book.title}`,
      image: "https://your-logo-url.com/logo.png", // Replace with your app's logo URL
      currency: "INR",
      key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay Key ID
      amount: book.price * 100, // Convert price to paise (₹500 -> 50000)
      name: "ReadRev",
      prefill: {
        email: "user@example.com",
        contact: "9999999999",
        name: "User  Name",
      },
      theme: { color: "#F37254" },
    };

    RazorpayCheckout.open(options)
      .then(async (data) => {
        Alert.alert("Payment Successful", `Payment ID: ${data.razorpay_payment_id}`);

        // **Save payment details to Firestore**
        try {
          await addDoc(collection(firestore, "payments"), {
            userEmail: "user@example.com", // Replace with logged-in user
            bookTitle: book.title,
            bookPrice: book.price,
            paymentId: data.razorpay_payment_id,
            paymentStatus: "Success",
            timestamp: serverTimestamp(),
          });
          console.log("Payment stored in Firestore");
        } catch (error) {
          console.error("Error saving payment:", error);
        }
      })
      .catch((error) => {
        Alert.alert("Payment Failed", error.description);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Buy {book.title} for ₹{book.price}</Text>

      {/* Show ActivityIndicator when loading */}
      {loading ? (
        <ActivityIndicator size="large" color="#F37254" style={{ marginTop: 20 }} />
      ) : (
        <TouchableOpacity
          onPress={handlePurchase}
          style={{
            backgroundColor: "#F37254",
            padding: 15,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Pay Now</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PaymentScreen;