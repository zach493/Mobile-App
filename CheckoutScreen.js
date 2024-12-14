import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const classPrices = {
  Economy: 6875,
  Business: 14502,
  'First Class': 10049,
};

const CheckoutScreen = ({ route, navigation }) => {
  const { passengers = [], flight_info, AirportOrigin, AirportDest, travelClass } = route.params || {}; // Destructure with default values
  const travelTax = 1620;

  const calculateTotalCost = () => {
    const flightCost = passengers.reduce((total, passenger) => {
      const classPrice = classPrices[passenger.travelClass] || 0; // Default to 0 if not found
      return total + classPrice;
    }, 0);
    return flightCost + travelTax;
  };

  const getRandomFlightTime = () => {
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const totalCost = calculateTotalCost();
  const departureTime = getRandomFlightTime();
  const arrivalTime = getRandomFlightTime();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('./img/card.png')}
        style={styles.cardImage}
      />

      {/* Flight Details */}
      <View style={styles.flightDetails}>
        <Text style={styles.flightTime}>{departureTime}</Text>
        <Text style={styles.airportCode}>{AirportOrigin}</Text>
        <Text style={styles.directText}>{flight_info?.type || 'Direct'}</Text> {/* Added fallback */}
        <Text style={styles.flightTime}>{arrivalTime}</Text>
        <Text style={styles.airportCode}>{AirportDest}</Text>
      </View>

      {/* Payment Details */}
      <Text style={styles.paymentTitle}>Making Payment to Philippine Airline</Text>
      <View style={styles.costDetails}>
        <Text style={styles.costText}>Flight cost</Text>
        <Text style={styles.costValue}>₱{totalCost.toFixed(2)}</Text>
      </View>
      <View style={styles.costDetails}>
        <Text style={styles.costText}>Airline fee</Text>
        <Text style={styles.costValue}>₱200.00</Text>
      </View>
      <View style={styles.costDetails}>
        <Text style={styles.costText}>Tax</Text>
        <Text style={styles.costValue}>₱{travelTax.toFixed(2)}</Text>
      </View>
      <View style={styles.totalCostDetails}>
        <Text style={styles.totalCostText}>Total Cost :</Text>
        <Text style={styles.totalCostValue}>₱{(totalCost + 200 + travelTax).toFixed(2)}</Text> {/* Include all fees */}
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('QRCodeScreen', { 
          passengers, // Use the passengers received from BookingScreen
          travelClass, 
          AirportOrigin, 
          AirportDest 
        })} 
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
