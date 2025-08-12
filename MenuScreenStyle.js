import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F1EC', // very light cream, easy on the eyes
  },
  header: {
    backgroundColor: '#4B3621', // rich dark coffee brown
    paddingTop: 44, // status bar height + extra spacing
    paddingBottom: 18,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Android shadow
    zIndex: 10,
  },
  headerTitle: {
    color: '#FFF5E1', // soft cream for contrast
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'System', // consistent system font (can customize)
    letterSpacing: 1,
  },
  searchInput: {
    backgroundColor: '#FFF5E1', // soft cream background
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 16,
    color: '#4B3621', // dark brown text
    fontWeight: '500',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  item: {
    backgroundColor: '#FFF5E1', // soft cream card background
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 12,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4B3621',
    fontFamily: 'System',
  },
  price: {
    fontSize: 16,
    marginTop: 6,
    color: '#7B5E3C', // lighter coffee brown
    fontWeight: '500',
  },
  ingredients: {
    fontSize: 14,
    marginTop: 6,
    color: '#9E8466', // subtle brownish beige
    fontStyle: 'italic',
  },
  addButton: {
    marginTop: 14,
    backgroundColor: '#7B5E3C', // medium coffee brown
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  addText: {
    color: '#FFF5E1',
    fontWeight: '700',
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#4B3621',
  },

  ingredientsContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 8,
},
ingredientPill: {
  backgroundColor: '#9E8466',
  paddingHorizontal: 10,
  paddingVertical: 5,
  borderRadius: 12,
  marginRight: 8,
  marginBottom: 8,
},
ingredientText: {
  color: '#FFF5E1',
  fontSize: 13,
  fontWeight: '500',
},

});
