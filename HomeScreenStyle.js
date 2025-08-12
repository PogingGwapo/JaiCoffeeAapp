import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4E9DC', // light creamy background
  },
  header: {
    backgroundColor: '#4B3621', // dark coffee brown
    paddingTop: 44, // status bar + padding
    paddingBottom: 18,
    paddingHorizontal: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
    zIndex: 10,
  },
  headerTitle: {
    color: '#FFF5E1', // soft cream
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'System',
    letterSpacing: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  introContainer: {
    marginVertical: 15,
  },
  introText: {
    fontSize: 18,
    color: '#5C4531',
    fontWeight: '500',
  },
  categoryContainer: {
    marginBottom: 25,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4B3621',
  },
  seeAll: {
    fontSize: 14,
    color: '#7D6B53',
    fontWeight: '600',
  },
  itemCard: {
    width: 140,
    marginRight: 15,
    backgroundColor: '#FFF5E1',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#A1887F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  imagePlaceholder: {
    width: 100,
    height: 80,
    backgroundColor: '#D9C6B8',
    borderRadius: 8,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4B3621',
    textAlign: 'center',
  },
  itemPrice: {
    fontSize: 14,
    color: '#7D6B53',
    marginTop: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blogSection: {
    marginBottom: 25,
  },
  blogTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#4B3621',
    marginBottom: 12,
  },
  blogCard: {
    backgroundColor: '#FFF5E1',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#A1887F',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  blogHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4B3621',
    marginBottom: 6,
  },
  blogContent: {
    fontSize: 14,
    color: '#5C4531',
  },
  feedbackSection: {
    marginBottom: 40,
  },
  feedbackTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4B3621',
    marginBottom: 12,
  },
  feedbackSubject: {
    borderWidth: 1,
    borderColor: '#7D6B53',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    color: '#4B3621',
    fontWeight: '600',
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: '#7D6B53',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    textAlignVertical: 'top',
    color: '#4B3621',
    fontWeight: '600',
    marginBottom: 16,
  },
  feedbackButton: {
    backgroundColor: '#4B3621',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  feedbackButtonText: {
    color: '#FFF5E1',
    fontSize: 16,
    fontWeight: '700',
  },

  profileModalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.5)',
  justifyContent: 'center',
  alignItems: 'center',
},
profileModal: {
  backgroundColor: '#FFF8F0',
  width: '80%',
  borderRadius: 15,
  alignItems: 'center',
  padding: 20,
},
profileImage: {
  width: 90,
  height: 90,
  borderRadius: 100,
  marginBottom: 10,
},
profileName: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#4B3621',
},
profileEmail: {
  fontSize: 14,
  color: '#7D6B53',
  marginBottom: 10,
},
profileOrders: {
  fontSize: 14,
  color: '#4B3621',
  marginBottom: 20,
},
logoutButton: {
  backgroundColor: '#4B3621',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 8,
},
logoutButtonText: {
  color: '#FFF',
  fontSize: 16,
},

header: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 15,
  paddingVertical: 10, // smaller height
  backgroundColor: '#4B3621',
},

headerTitle: {
  color: '#fff',
  fontSize: 20,
  fontWeight: 'bold',
},

profileIconContainer: {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: '#fff',
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 3,
},

profileIconText: {
  color: '#4B3621',
  fontSize: 16,
  fontWeight: 'bold',
},


});
