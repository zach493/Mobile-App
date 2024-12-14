import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ScannedInfoScreen = ({ route }) => {
  const { data } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Passenger Information</Text>
      <Text>Name: {data.name}</Text>
      <Text>Nationality: {data.nationality}</Text>
      <Text>Gender: {data.gender}</Text>
      <Text>Email: {data.email}</Text>
      <Text>Birth Date: {data.birthDate}</Text>
      <Text>Flight: {data.flight}</Text>
      <Text>Gate: {data.gate}</Text>
      <Text>Class: {data.travelClass}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ScannedInfoScreen;