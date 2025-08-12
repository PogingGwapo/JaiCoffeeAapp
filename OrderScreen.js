import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import { getFirestore, collection, query, orderBy, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { app } from '../firebase/firebaseConfig';
import styles from '../styles/OrdersScreenStyle';

const db = getFirestore(app);

export default function OrderScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
      }));

      setOrders(ordersData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching orders:', error);
      setLoading(false);
      Alert.alert('Failed to load orders.');
    });

    return () => unsubscribe();
  }, []);

  const cancelOrder = (orderId) => {
    Alert.alert(
      'Cancel Order',
      'Are you sure you want to cancel this order?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'orders', orderId));
              Alert.alert('Order cancelled');
            } catch (error) {
              console.error('Error cancelling order:', error);
              Alert.alert('Failed to cancel order.');
            }
          },
        },
      ]
    );
  };

  const confirmReceived = (orderId) => {
    Alert.alert(
      'Confirm Received',
      'Do you want to remove this order from your history?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'orders', orderId));
              Alert.alert('Order removed from history');
            } catch (error) {
              console.error('Error removing order:', error);
              Alert.alert('Failed to remove order.');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6F4E37" />
        </View>
      </SafeAreaView>
    );
  }

  if (orders.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Kuya Jai Coffee App</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No orders found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const renderOrder = ({ item }) => {
    const now = new Date();
    const orderDate = item.createdAt;
    const diffMinutes = (now - orderDate) / 60000;
    const canCancel = diffMinutes <= 5;

    return (
      <View style={styles.orderCard}>
        <Text style={styles.orderDate}>{orderDate.toLocaleString()}</Text>
        {item.items.map((orderItem, idx) => (
          <View key={idx} style={styles.orderItem}>
            <Text style={styles.itemName}>{orderItem.name} x{orderItem.quantity}</Text>
            <Text style={styles.itemPrice}>₱{orderItem.price}</Text>
            {orderItem.removedIngredients?.length > 0 && (
              <Text style={styles.removedIngredients}>Removed: {orderItem.removedIngredients.join(', ')}</Text>
            )}
            {orderItem.suggestions ? (
              <Text style={styles.suggestions}>Notes: {orderItem.suggestions}</Text>
            ) : null}
          </View>
        ))}

        <Text style={styles.totalAmount}>Total: ₱{item.totalAmount.toFixed(2)}</Text>

        <View style={styles.orderButtons}>
          {canCancel && (
            <TouchableOpacity style={styles.cancelButton} onPress={() => cancelOrder(item.id)}>
              <Text style={styles.cancelButtonText}>Cancel Order</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.confirmButton} onPress={() => confirmReceived(item.id)}>
            <Text style={styles.confirmButtonText}>Mark as Received</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Kuya Jai Coffee App</Text>
      </View>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrder}
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
      />
    </SafeAreaView>
  );
}
