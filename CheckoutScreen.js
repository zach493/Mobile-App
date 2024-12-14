import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const classPrices = {
  Economy: 6875,
  Business: 14502,
  'First Class': 10049,
};

const CheckoutScreen = ({ route, navigation }) => {
  const { passengers, travelClass, AirportOrigin, AirportDest } = route.params || {};
  console.log("Passed passengers data:", passengers);
  const calculateTotalCost = () => {
    return passengers.reduce((total, passenger) => {
      const classPrice = classPrices[passenger.travel_class] || 0;
      return total + classPrice;
    }, 0);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <Text style={styles.subtitle}>Review your flight details</Text>
      <Text style={styles.details}>
        From: {AirportOrigin} - To: {AirportDest}
      </Text>
      <Text style={styles.details}>Travel Class: {travelClass}</Text>
      <Text style={styles.details}>Passengers:</Text>
      {passengers.map((passenger, index) => (
        <View key={index} style={styles.passengerDetails}>
          <Text>Name: {passenger.given_name}</Text>
          <Text>Email: {passenger.email}</Text>
          <Text>Nationality: {passenger.nationality}</Text>
          <Text>Gender: {passenger.gender}</Text>
          <Text>Birth Date: {`${passenger.birthDate.year}-${passenger.birthDate.month}-${passenger.birthDate.day}`}</Text>
          <Text>Class: {passenger.travel_class}</Text>
        </View>
      ))}

      <Text style={styles.totalCost}>Total Cost: ₱{calculateTotalCost().toFixed(2)}</Text>

      <TouchableOpacity onPress={() => navigation.navigate('QRCodeScreen', { passengers, AirportOrigin, AirportDest })}>
        <Text style={styles.button}>Proceed to Payment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    marginVertical: 5,
  },
  passengerDetails: {
    padding: 10,
    borderWidth: 1,
    marginVertical: 5,
  },
  totalCost: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  button: {
    fontSize: 18,
    color: '#fff',
    backgroundColor: '#007BFF',
    textAlign: 'center',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
});

export default CheckoutScreen;
