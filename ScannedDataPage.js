import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const ScannedDataPage = ({ route }) => {
  const { qrData } = route.params; 
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Booked Flight Information</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Name:</Text>
        <Text style={styles.cardContent}>{qrData.given_name}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>email:</Text>
        <Text style={styles.cardContent}>{qrData.email}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Nationality:</Text>
        <Text style={styles.cardContent}>{qrData.Nationality}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Gender:</Text>
        <Text style={styles.cardContent}>{qrData.gender}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Birth Date:</Text>
        <Text style={styles.cardContent}>{qrData.birthDate}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Flight:</Text>
        <Text style={styles.cardContent}>{qrData.flight}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Gate:</Text>
        <Text style={styles.cardContent}>{qrData.gate}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Group:</Text>
        <Text style={styles.cardContent}>{qrData.group}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Seat:</Text>
        <Text style={styles.cardContent}>{qrData.seat}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Origin Flight:</Text>
        <Text style={styles.cardContent}>{qrData.origin}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Destination Flight:</Text>
        <Text style={styles.cardContent}>{qrData.destination}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardContent: {
    fontSize: 16,
    color: '#555',
  },
});

export default ScannedDataPage;
