import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment-timezone';

export default function TicketDetail({ route, navigation }) {
  const { ticket } = route.params;
  const [selectedPassengers, setSelectedPassengers] = useState('4');
  const [selectedClass, setSelectedClass] = useState('Economy');
  const formatDateAndTime = (dateString) => {
    const utcDate = moment.utc(dateString);
    const localDate = utcDate.tz('Asia/Manila', true);
    return localDate.format('YYYY-MM-DD HH:mm:ss');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('./img/gary-lopater-dOOGrK3zcUc-unsplash.jpg')} style={styles.headerImage} />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('./img/logo-back.png')} style={styles.logoImage} />
      </TouchableOpacity>
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.label}>Departure</Text>
          <Text style={styles.info}>{ticket.departure}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Destination</Text>
          <Text style={styles.info}>{ticket.destination}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Departure Date and Time</Text>
          <Text style={styles.info}>{formatDateAndTime(ticket.date)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Type</Text>
          <Text style={styles.info}>{ticket.type}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Passenger</Text>
          <Picker
            selectedValue={selectedPassengers}
            onValueChange={(itemValue) => setSelectedPassengers(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="1 Passenger" value="1" />
            <Picker.Item label="2 Passengers" value="2" />
            <Picker.Item label="3 Passengers" value="3" />
            <Picker.Item label="4 Passengers" value="4" />
            <Picker.Item label="5 Passengers" value="5" />
          </Picker>
        </View>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() =>
            navigation.navigate('Booking', {
              passengers: selectedPassengers,
              travelClass: selectedClass,
              AirportOrigin: ticket.departure, 
              AirportDest: ticket.destination,
            })
          }
        >
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  headerImage: {
    width: '100%',
    height: 200,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 10,
    padding: 10,
  },
  logoImage: {
    width: 24,
    height: 24,
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: '#888',
  },
  info: {
    flex: 2,
    fontSize: 18,
    fontWeight: 'bold',
  },
  airlineLogo: {
    width: 50,
    height: 20,
    resizeMode: 'contain',
  },
  picker: {
    flex: 2,
    height: 50,
    width: '100%',
  },
  checkoutButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
