import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import SvgQRCode from 'react-native-qrcode-svg';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const QRCodeScreen = ({ route }) => {
  const passengers = route.params?.passengers || []; // Passengers from Booking Screen

  // Function to generate random seat and group
  const generateRandomSeatAndGroup = () => ({
    group: String.fromCharCode(65 + Math.floor(Math.random() * 26)), // Random letter A-Z
    seat: Math.floor(Math.random() * 30) + 1, // Random seat number 1-30
  });

  // Function to save QR code as an image
  const saveQRCode = async (qrData) => {
    const fileUri = `${FileSystem.documentDirectory}${qrData.given_name.replace(/\s/g, '_')}_QRCode.png`;
    await FileSystem.writeAsStringAsync(fileUri, qrData.value, { encoding: FileSystem.EncodingType.Base64 });
    await Sharing.shareAsync(fileUri);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Boarding Pass With QR Code</Text>

      {passengers.map((passenger, index) => {
        const { group, seat } = generateRandomSeatAndGroup();

        const qrData = {
          given_name: passenger.givenName || 'Unknown',
          email: passenger.email || 'No Email',
          flight: passenger.flight || '15', // Dynamic flight number if provided
          gate: passenger.gate || 'F08', // Dynamic gate if provided
          group,
          seat,
          value: JSON.stringify({
            given_name: passenger.givenName || 'Unknown',
            email: passenger.email || 'No Email',
            flight: passenger.flight || '15',
            gate: passenger.gate || 'F08',
            group,
            seat,
          }),
        };

        return (
          <View key={index} style={styles.passContainer}>
            <View style={styles.qrContainer}>
              <SvgQRCode value={qrData.value} size={150} />
            </View>
            <Text style={styles.passengerInfo}>
  {qrData.given_name || 'Unknown'} - {qrData.email || 'No Email'}{"\n"}
  Flight: {qrData.flight || '15'} - Gate: {qrData.gate || 'F08'}{"\n"}
  Group: {qrData.group || 'N/A'} - Seat: {qrData.seat || 'N/A'}
</Text>

            <TouchableOpacity style={styles.downloadButton} onPress={() => saveQRCode(qrData)}>
              <Text style={styles.buttonText}>Download Ticket</Text>
            </TouchableOpacity>
          </View>
        );
      })}
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
