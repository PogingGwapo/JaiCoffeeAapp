import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5EFE6',
  },
  header: {
    backgroundColor: '#6F4E37',
    paddingTop: 40,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  cartItem: {
    backgroundColor: '#FFF8F0',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    padding: 15,
    elevation: 2,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4B3832',
  },
  itemPrice: {
    fontSize: 16,
    color: '#7D6B53',
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  qtyButton: {
    backgroundColor: '#6F4E37',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  qtyButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantity: {
    marginHorizontal: 12,
    fontSize: 16,
    color: '#4B3832',
  },
  ingredientsContainer: {
    marginTop: 12,
  },
  ingredientToggle: {
    backgroundColor: '#EDE7E2',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    marginRight: 10,
  },
  ingredientRemoved: {
    backgroundColor: '#BFA6A0',
  },
  ingredientText: {
    color: '#4B3832',
    fontWeight: '500',
  },
  ingredientTextRemoved: {
    color: '#6F4E37',
    textDecorationLine: 'line-through',
    fontWeight: '500',
  },
  suggestionsLabel: {
    marginTop: 15,
    fontWeight: '600',
    color: '#4B3832',
  },
  suggestionsInput: {
    marginTop: 6,
    backgroundColor: '#FFF8F0',
    borderColor: '#6F4E37',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    minHeight: 60,
    textAlignVertical: 'top',
    color: '#4B3832',
    fontSize: 15,
  },
  totalContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#6F4E37',
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    color: '#FFF8F0',
    fontSize: 18,
    fontWeight: '700',
  },
  checkoutButton: {
    backgroundColor: '#D2691E',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  checkoutButtonText: {
    color: '#FFF8F0',
    fontSize: 16,
    fontWeight: '700',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#4B3832',
  },
});
