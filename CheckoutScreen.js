import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const CheckoutScreen = ({ route,navigation }) => {
  const { passengers } = route.params || [];

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Image
        source={require('./img/card.png')}
        style={styles.cardImage}
      />

      {/* Flight Details */}
      <View style={styles.flightDetails}>
        <Text style={styles.flightTime}>7:45</Text>
        <Text style={styles.airportCode}>MNL</Text>
        <Text style={styles.flightDuration}>1h 15m</Text>
        <Text style={styles.directText}>Direct</Text>
        <Text style={styles.flightTime}>9:00</Text>
        <Text style={styles.airportCode}>KLO</Text>
      </View>

      {/* Payment Details */}
      <Text style={styles.paymentTitle}>Making Payment to Philippine Airline</Text>
      <View style={styles.costDetails}>
        <Text style={styles.costText}>Flight cost</Text>
        <Text style={styles.costValue}>₱1600.00</Text>
      </View>
      <View style={styles.costDetails}>
        <Text style={styles.costText}>Airline fee</Text>
        <Text style={styles.costValue}>₱200.00</Text>
      </View>
      <View style={styles.costDetails}>
        <Text style={styles.costText}>Tax</Text>
        <Text style={styles.costValue}>₱100.00</Text>
      </View>
      <View style={styles.totalCostDetails}>
        <Text style={styles.totalCostText}>Total Cost :</Text>
        <Text style={styles.totalCostValue}>₱1900</Text>
      </View>

      {/* Button */}
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('QRCodeScreen')} // Navigate to QRCodeScreen
      >
        <Text style={styles.buttonText}>Checkout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  backText: {
    fontSize: 20,
    color: '#000',
  },
  cardImage: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    marginTop: 40,
  },
  flightDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  flightTime: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  airportCode: {
    fontSize: 16,
    color: '#555',
  },
  flightDuration: {
    fontSize: 16,
    color: '#555',
  },
  directText: {
    fontSize: 16,
    color: '#000',
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  costDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  costText: {
    fontSize: 16,
    color: '#555',
  },
  costValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalCostDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  totalCostText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalCostValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CheckoutScreen;
