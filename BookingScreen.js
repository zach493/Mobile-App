import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const BookingScreen = ({ route }) => {
  const navigation = useNavigation();
  const { passengers: initialPassengerCount, travelClass, AirportOrigin, AirportDest } = route.params || {};
  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    const initialPassengers = Array.from({ length: initialPassengerCount || 1 }, () => ({
      givenName: '',
      nationality: '',
      gender: '',
      email: '',
      birthDate: { year: '', month: '', day: '' },
      travelClass: travelClass || 'Economy',
    }));
    setPassengers(initialPassengers);
  }, [initialPassengerCount, travelClass]);

  const updatePassenger = (index, key, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][key] = value;
    setPassengers(updatedPassengers);
  };

  const generateRandomFlightDetails = () => {
    const flights = ['15', '20', '25']; // Example flight numbers
    const gates = ['A1', 'B2', 'C3']; // Example gates
    const group = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Random letter A-Z
    const seat = Math.floor(Math.random() * 30) + 1; // Random seat number 1-30
    return {
      flight: flights[Math.floor(Math.random() * flights.length)],
      gate: gates[Math.floor(Math.random() * gates.length)],
      group,
      seat,
    };
  };

  const savePassengersToDatabase = async () => {
    try {
      // Validate passengers data
      const isValid = passengers.every(passenger => {
        return (
          passenger.givenName.trim() !== '' &&
          passenger.nationality.trim() !== '' &&
          passenger.gender.trim() !== '' &&
          passenger.email.trim() !== '' &&
          passenger.birthDate.year !== '' &&
          passenger.birthDate.month !== '' &&
          passenger.birthDate.day !== '' // Ensure all birthDate fields are set
        );
      });
  
      if (!isValid) {
        alert('Please fill in all fields before submitting.');
        return;
      }
  
      const passengerData = passengers.map(passenger => {
        const { flight, gate, group, seat } = generateRandomFlightDetails();
        const birthDate = `${passenger.birthDate.year}-${passenger.birthDate.month}-${passenger.birthDate.day}`;
        return {
          given_name: passenger.givenName, // Maps to `given_name` in the DB
          email: passenger.email, // Maps to `email`
          birth_date: birthDate, // Maps to `birth_date`
          nationality: passenger.nationality, // Maps to `nationality`
          gender: passenger.gender, // Maps to `gender`
          travel_class: passenger.travelClass || 'Economy', // Maps to `travel_class`
          flight_number: flight, // Maps to `flight_number`
          gate, // Maps to `gate`
          group, // Added as part of random generation
          seat, // Added as part of random generation
        };
      });
  
      console.log('Passenger data being sent to the API:', passengerData);
  
      // Send data to the API
      const response = await axios.post('https://he-production-466d.up.railway.app/passengers', { passengers: passengerData });
      console.log('Data saved successfully:', response.data);
  
      // Navigate to Checkout with passengers and airport details
      navigation.navigate('Checkout', { 
        passengers: passengerData, 
        travelClass, 
        AirportOrigin, 
        AirportDest 
      });
    } catch (error) {
      console.error('Error saving passenger data:', error);
      alert('An error occurred while saving passenger data.');
    }
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Book your flight</Text>
      <Text style={styles.subtitle}>Enter The Information Of the Passengers</Text>

      {passengers.map((passenger, index) => (
        <View key={index} style={styles.passengerContainer}>
          <TextInput
            style={styles.input}
            placeholder="Given Name"
            value={passenger.givenName}
            onChangeText={(value) => updatePassenger(index, 'givenName', value)}
          />
          <Picker
            selectedValue={passenger.nationality}
            style={styles.input}
            onValueChange={(value) => updatePassenger(index, 'nationality', value)}
          >
            <Picker.Item label="Select Nationality" value="" />
            <Picker.Item label="American" value="American" />
            <Picker.Item label="Canadian" value="Canadian" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
          <Picker
            selectedValue={passenger.gender}
            style={styles.input}
            onValueChange={(value) => updatePassenger(index, 'gender', value)}
          >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            keyboardType="email-address"
            value={passenger.email}
            onChangeText={(value) => updatePassenger(index, 'email', value)}
          />
          
          <Text style={styles.dateText}>Select Birth Date</Text>

          {/* Year Picker */}
          <Picker
            selectedValue={passenger.birthDate.year}
            style={styles.input}
            onValueChange={(value) => updatePassenger(index, 'birthDate', { ...passenger.birthDate, year: value })}
          >
            <Picker.Item label="Year" value="" />
            {Array.from({ length: 100 }, (_, i) => 2023 - i).map((year) => (
              <Picker.Item key={year} label={year.toString()} value={year.toString()} />
            ))}
          </Picker>

          {/* Month Picker */}
          <Picker
            selectedValue={passenger.birthDate.month}
            style={styles.input}
            onValueChange={(value) => updatePassenger(index, 'birthDate', { ...passenger.birthDate, month: value })}
          >
            <Picker.Item label="Month" value="" />
            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, i) => (
              <Picker.Item key={i} label={month} value={(i + 1).toString()} />
            ))}
          </Picker>

          {/* Day Picker */}
          <Picker
            selectedValue={passenger.birthDate.day}
            style={styles.input}
            onValueChange={(value) => updatePassenger(index, 'birthDate', { ...passenger.birthDate, day: value })}
          >
            <Picker.Item label="Day" value="" />
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
              <Picker.Item key={day} label={day.toString()} value={day.toString()} />
            ))}
          </Picker>

          <Picker
            selectedValue={passenger.travelClass}
            style={styles.input}
            onValueChange={(value) => updatePassenger(index, 'travelClass', value)}
          >
            <Picker.Item label="Economy" value="Economy" />
            <Picker.Item label="Business" value="Business" />
            <Picker.Item label="First Class" value="First Class" />
          </Picker>
        </View>
      ))}

      <Text style={styles.passengerCount}>Passengers Added: {initialPassengerCount}</Text>

      <Button
        title="Save and Proceed to Checkout"
        onPress={savePassengersToDatabase}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  passengerContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  passengerCount: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default BookingScreen;
