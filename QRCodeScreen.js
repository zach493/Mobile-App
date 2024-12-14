import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import SvgQRCode from 'react-native-qrcode-svg';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const QRCodeScreen = ({ route, navigation }) => {
  const passengers = route.params?.passengers || []; 
  const { AirportOrigin, AirportDest } = route.params || {};
  const generateRandomSeatAndGroup = () => ({
    group: String.fromCharCode(65 + Math.floor(Math.random() * 26)), 
    seat: Math.floor(Math.random() * 30) + 1, 
  });

  const saveQRCode = async (qrData) => {
    const fileUri = `${FileSystem.documentDirectory}${qrData.given_name.replace(/\s/g, '_')}_QRCode.png`;
    await FileSystem.writeAsStringAsync(fileUri, qrData.value, { encoding: FileSystem.EncodingType.Base64 });
    await Sharing.shareAsync(fileUri);
    navigation.navigate('Main');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Boarding Pass With QR Code</Text>

      {passengers.map((passenger, index) => {
        const { group, seat } = generateRandomSeatAndGroup();
        const qrData = {
          given_name: passenger.given_name || 'Unknown',
          email: passenger.email || 'No Email',
          nationality: passenger.nationality || 'N/A',
          gender: passenger.gender || 'N/A',
          birthDate: `${passenger.birthDate?.year || 'N/A'}-${passenger.birthDate?.month || 'N/A'}-${passenger.birthDate?.day || 'N/A'}`,
          flight: passenger.flight || '15', 
          gate: passenger.gate || 'F08',
          group,
          seat,
          origin: AirportOrigin || 'Unknown',
          destination: AirportDest || 'Unknown',
          value: JSON.stringify({
            given_name: passenger.given_name || 'Unknown',
            email: passenger.email || 'No Email',
            nationality: passenger.nationality || 'N/A',
            gender: passenger.gender || 'N/A',
            birthDate: `${passenger.birthDate?.year || 'N/A'}-${passenger.birthDate?.month || 'N/A'}-${passenger.birthDate?.day || 'N/A'}`,
            flight: passenger.flight || '15',
            gate: passenger.gate || 'F08',
            group,
            seat,
            origin: AirportOrigin || 'Unknown',
            destination: AirportDest || 'Unknown',
          }),
        };

        return (
          <View key={index} style={styles.passContainer}>
            <View style={styles.qrContainer}>
              <SvgQRCode value={qrData.value} size={150} />
            </View>
            <Text style={styles.passengerInfo}>
              {qrData.given_name} - {qrData.email}{"\n"}
              Nationality: {qrData.nationality} - Gender: {qrData.gender}{"\n"}
              Birth Date: {qrData.birthDate}{"\n"}
              Flight: {qrData.flight} - Gate: {qrData.gate}{"\n"}
              Group: {qrData.group} - Seat: {qrData.seat}{"\n"}
              From: {qrData.origin} - To: {qrData.destination}
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
