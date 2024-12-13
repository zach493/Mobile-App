import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios'; // Import Axios

const BookingScreen = ({ route }) => {
  const navigation = useNavigation();
  const { passengers: initialPassengerCount, travelClass, AirportOrigin, AirportDest } = route.params || {};
  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    const initialPassengers = Array.from({ length: initialPassengerCount || 1 }, () => ({
      givenName: '',
      lastName: '',
      nationality: '',
      gender: '',
      email: '',
      birthDate: null,
      travelClass: travelClass || 'Economy',
    }));
    setPassengers(initialPassengers);
  }, [initialPassengerCount, travelClass]);

  const updatePassenger = (index, key, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][key] = value;
    setPassengers(updatedPassengers);
  };

  const savePassengersToDatabase = async () => {
    try {
      const passengerData = passengers.map(passenger => ({
        Name: `${passenger.givenName} ${passenger.lastName}`,
        Nationality: passenger.nationality,
        Gender: passenger.gender,
        Email: passenger.email,
        Birthdate: passenger.birthDate ? passenger.birthDate.toISOString().split('T')[0] : null, // Format date
        Class: passenger.travelClass,
      }));

      // Send data to the API
      const response = await axios.post('https://localhost:3660/users', { passengers: passengerData });
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
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={passenger.lastName}
            onChangeText={(value) => updatePassenger(index, 'lastName', value)}
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
          <TouchableOpacity
            style={styles.datePicker}
            onPress={() => updatePassenger(index, 'showDatePicker', true)}
          >
            <Text style={styles.dateText}>
              {passenger.birthDate ? passenger.birthDate.toDateString() : 'Select Birth Date'}
            </Text>
          </TouchableOpacity>
          {passenger.showDatePicker && (
            <DateTimePicker
              value={passenger.birthDate || new Date()}
              mode="date"
              display="default"
              onChange={(event, date) => {
                updatePassenger(index, 'birthDate', date || passenger.birthDate);
                updatePassenger(index, 'showDatePicker', false);
              }}
            />
          )}
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
  datePicker: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  dateText: {
    color: '#555',
  },
  passengerCount: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default BookingScreen;