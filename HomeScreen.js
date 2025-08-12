import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  TextInput,
  Alert,
  Linking,
  SafeAreaView,
  Modal,
  Image
} from 'react-native';
import { getAllMenuItems } from '../services/MenuService';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import styles from '../styles/HomeScreenStyle';

export default function HomeScreen({ navigation }) {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [feedbackSubject, setFeedbackSubject] = useState('');
  const [profileVisible, setProfileVisible] = useState(false);
  const [orderCount, setOrderCount] = useState(0);
  const [userInfo, setUserInfo] = useState({ name: '', email: '', photoURL: '' });

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const items = await getAllMenuItems();
        setMenuItems(items);
      } catch (error) {
        console.error('Error fetching menu:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        setUserInfo({
          name: user.displayName || 'Guest User',
          email: user.email,
          photoURL: user.photoURL || 'https://via.placeholder.com/100'
        });

       
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setOrderCount(docSnap.data().orderCount || 0);
        }
      }
    };

    fetchItems();
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);

    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleProfilePress = () => {
    Alert.alert(
      'Profile',
      'Do you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', style: 'destructive', onPress: handleLogout }
      ]
    );
  };

  const renderCategory = (category) => {
    const items = menuItems.filter(item => item.category === category).slice(0, 5);
    return (
      <View style={styles.categoryContainer}>
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryTitle}>{category}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Menu', { category })}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={items}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemCard}>
              <View style={styles.imagePlaceholder} />
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>₱{item.price}</Text>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  };



  const blogs = [
    { id: '1', title: 'Our Coffee Journey', content: 'We source the finest beans from around the world to bring you the perfect cup every time.' },
    { id: '2', title: 'Tips for Brewing the Perfect Cup', content: 'Start with fresh water, use the right grind size, and enjoy your coffee fresh.' },
    { id: '3', title: 'A Cup of Kindness', content: 'Every cup you buy supports local farmers We work with suppliers who pay fair wages and invest in their communities. So when you enjoy your coffee here, you’re also helping someone’s dream grow' },
  ];

  const sendFeedback = () => {
    if (!feedbackSubject || !feedback) {
      Alert.alert('Please fill both subject and feedback');
      return;
    }

    const email = 'chrisjanibanez72@gmail.com';
    const subject = encodeURIComponent(feedbackSubject);
    const body = encodeURIComponent(feedback);

    const url = `mailto:${email}?subject=${subject}&body=${body}`;
    Linking.openURL(url)
      .catch(() => Alert.alert('Could not open mail client'));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4B3621" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Kuya Jai Coffee App</Text>
        <TouchableOpacity onPress={handleProfilePress}>
          <View style={styles.profileIconContainer}>
            <Text style={styles.profileIconText}> ☕</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Profile Modal (optional if you want to keep it) */}
      <Modal visible={profileVisible} animationType="slide" transparent>
        <View style={styles.profileModalOverlay}>
          <View style={styles.profileModal}>
            <Image
              source={{ uri: userInfo.photoURL }}
              style={styles.profileImage}
            />
            <Text style={styles.profileName}>{userInfo.name}</Text>
            <Text style={styles.profileEmail}>{userInfo.email}</Text>
            <Text style={styles.profileOrders}>Orders made: {orderCount}</Text>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setProfileVisible(false)}>
              <Text style={{ color: '#4B3621', marginTop: 10 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Scrollable content */}
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
        <View style={styles.introContainer}>
          <Text style={styles.introText}>Welcome to Kuya Jai Coffee! Freshly brewed drinks and desserts just for you.</Text>
        </View>

        {renderCategory('Coffee')}
        {renderCategory('Non-Coffee')}

     
        <View style={styles.blogSection}>
          <Text style={styles.blogTitle}>Blogs</Text>
          {blogs.map(blog => (
            <View key={blog.id} style={styles.blogCard}>
              <Text style={styles.blogHeading}>{blog.title}</Text>
              <Text style={styles.blogContent}>{blog.content}</Text>
            </View>
          ))}
        </View>

        {/* FEEDBACK SECTION */}
        <View style={styles.feedbackSection}>
          <Text style={styles.feedbackTitle}>Send Feedback</Text>
          <TextInput
            style={styles.feedbackSubject}
            placeholder="Subject"
            placeholderTextColor="#7D6B53"
            value={feedbackSubject}
            onChangeText={setFeedbackSubject}
          />
          <TextInput
            style={styles.feedbackInput}
            placeholder="Write your feedback..."
            placeholderTextColor="#7D6B53"
            multiline
            numberOfLines={4}
            value={feedback}
            onChangeText={setFeedback}
          />
          <TouchableOpacity style={styles.feedbackButton} onPress={sendFeedback}>
            <Text style={styles.feedbackButtonText}>Send Feedback</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
