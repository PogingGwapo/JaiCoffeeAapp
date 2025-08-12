import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../firebase/firebaseConfig';
import { useCart } from '../contexts/CartContext';
import styles from '../styles/MenuScreenStyle';

const db = getFirestore(app);

export default function MenuScreen({ route }) {
  const { addToCart } = useCart();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  const categoryParam = route?.params?.category || null;

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const menuRef = collection(db, 'menuItems'); // Note: collection is "menuItems"
        const snapshot = await getDocs(menuRef);
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        let filteredItems = items;
        if (categoryParam) {
          filteredItems = items.filter(item => item.category === categoryParam);
        } else {
          filteredItems = items.filter(
            item => item.category === 'Coffee' || item.category === 'Non-Coffee'
          );
        }

        setMenuItems(filteredItems);
      } catch (error) {
        console.error('Error fetching menu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [categoryParam]);

  // Filter by search text
  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4B3621" />
      </View>
    );
  }

  if (filteredItems.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No items found.</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.price}>₱{item.price}</Text>

      <View style={styles.ingredientsContainer}>
        {item.ingredients?.map((ingredient, index) => (
          <View key={index} style={styles.ingredientPill}>
            <Text style={styles.ingredientText}>{ingredient}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
        <Text style={styles.addText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Fixed header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Kuya Jai Coffee Shop</Text>
      </View>

      {/* Search bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search menu..."
        placeholderTextColor="#7B5E3C"
        value={searchText}
        onChangeText={setSearchText}
      />

      <FlatList
        data={filteredItems}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
