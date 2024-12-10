import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import SvgQRCode from 'react-native-qrcode-svg';

const QRCodeScreen = ({ route }) => {
    const passengers = route.params?.passengers || []; // Safely access passengers with a default empty array
  
    // Function to generate random seat and group
    const generateRandomSeatAndGroup = () => {
      const group = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Random letter A-Z
      const seat = Math.floor(Math.random() * 30) + 1; // Random seat number 1-30
      return { group, seat };
    };
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Boarding Pass With QR Code</Text>
  
        {passengers.map((passenger, index) => {
          const { group, seat } = generateRandomSeatAndGroup();
          const qrData = {
            name: `${passenger.givenName} ${passenger.lastName}`,
            email: passenger.email,
            flight: '15', // Static flight number
            gate: 'F08',  // Static gate
            group,
            seat,
          };
  
          return (
            <View key={index} style={styles.passContainer}>
              <View style={styles.qrContainer}>
                <SvgQRCode value={JSON.stringify(qrData)} size={150} />
              </View>
              <Text style={styles.passengerInfo}>
                {qrData.name} - {qrData.email}{"\n"}
                Flight: {qrData.flight} - Gate: {qrData.gate}{"\n"}
                Group: {qrData.group} - Seat: {qrData.seat}
              </Text>
            </View>
          );
        })}
  
        <TouchableOpacity style={styles.downloadButton}>
          <Text style={styles.buttonText}>Download Ticket</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  passContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  qrContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  passengerInfo: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
  downloadButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default QRCodeScreen;
