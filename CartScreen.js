import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useCart } from '../contexts/CartContext';
import styles from '../styles/CartScreenStyle';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { app } from '../firebase/firebaseConfig';

const db = getFirestore(app);

export default function CartScreen() {
  const { cart, addToCart, removeOneFromCart, removeFromCart, clearCart } = useCart();
  const [suggestions, setSuggestions] = useState({});
  const [removedIngredients, setRemovedIngredients] = useState({});

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  // Toggle removed ingredient for an item
  const toggleIngredient = (itemId, ingredient) => {
    setRemovedIngredients(prev => {
      const itemRemoved = prev[itemId] || [];
      if (itemRemoved.includes(ingredient)) {
        return { 
          ...prev, 
          [itemId]: itemRemoved.filter(i => i !== ingredient) 
        };
      } else {
        return { 
          ...prev, 
          [itemId]: [...itemRemoved, ingredient] 
        };
      }
    });
  };

  const onCheckout = () => {
    if (cart.length === 0) {
      Alert.alert('Your cart is empty!');
      return;
    }

    Alert.alert(
      'Confirm Checkout',
      `Total amount: ₱${getTotal()}\nDo you want to place the order?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: async () => {
            try {
              const orderData = {
                items: cart.map(item => ({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity,
                  suggestions: suggestions[item.id] || '',
                  removedIngredients: removedIngredients[item.id] || [],
                })),
                totalAmount: Number(getTotal()),
                createdAt: serverTimestamp(),
                status: 'Pending',
              };

              await addDoc(collection(db, 'orders'), orderData);

              clearCart();
              setSuggestions({});
              setRemovedIngredients({});
              Alert.alert('Order placed!');
            } catch (error) {
              console.error('Failed to place order:', error);
              Alert.alert('Error placing order. Please try again.');
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>₱{item.price}</Text>

      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => removeOneFromCart(item.id)} style={styles.qtyButton}>
          <Text style={styles.qtyButtonText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.quantity}>{item.quantity}</Text>

        <TouchableOpacity onPress={() => addToCart(item)} style={styles.qtyButton}>
          <Text style={styles.qtyButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Ingredients with crossout toggle */}
      {item.ingredients && (
        <View style={styles.ingredientsContainer}>
          <Text style={styles.suggestionsLabel}>Ingredients (tap to remove):</Text>
          <FlatList
            data={item.ingredients}
            horizontal
            keyExtractor={(ing) => ing}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item: ingredient }) => {
              const isRemoved = removedIngredients[item.id]?.includes(ingredient);
              return (
                <TouchableOpacity
                  style={[styles.ingredientToggle, isRemoved && styles.ingredientRemoved]}
                  onPress={() => toggleIngredient(item.id, ingredient)}
                >
                  <Text style={isRemoved ? styles.ingredientTextRemoved : styles.ingredientText}>
                    {ingredient}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}

      <Text style={styles.suggestionsLabel}>Suggestions / Notes:</Text>
      <TextInput
        style={styles.suggestionsInput}
        placeholder="Add your suggestions here..."
        multiline
        value={suggestions[item.id] || ''}
        onChangeText={text => setSuggestions(prev => ({ ...prev, [item.id]: text }))}
      />
    </View>
  );

  if (cart.length === 0) {
    return (
      <View style={styles.emptyCart}>
        <Text>Your cart is empty</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Kuya Jai Coffee App</Text>
      </View>

      <FlatList
        data={cart}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ₱{getTotal()}</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={onCheckout}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
