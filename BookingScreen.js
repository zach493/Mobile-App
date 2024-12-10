import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const BookingScreen = ({ route }) => {
  const navigation = useNavigation(); // Initialize navigation
  const { passengers: initialPassengerCount, travelClass } = route.params || {};
  const [passengers, setPassengers] = useState([]);
  const [passengerCount, setPassengerCount] = useState(initialPassengerCount || 1);

  useEffect(() => {
    const initialPassengers = Array.from({ length: passengerCount }, () => ({
      givenName: '',
      lastName: '',
      nationality: '',
      gender: '',
      email: '',
      birthDate: null,
    }));
    setPassengers(initialPassengers);
  }, [passengerCount]);

  const addPassenger = () => {
    const newPassenger = { givenName: '', lastName: '', nationality: '', gender: '', email: '', birthDate: null };
    const updatedPassengers = [...passengers, newPassenger];
    
    setPassengers(updatedPassengers);
    setPassengerCount(updatedPassengers.length);  // Update the count based on the length of the updated array
  };
  

  const updatePassenger = (index, key, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][key] = value;
    setPassengers(updatedPassengers);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Book your flight</Text>
      <Text style={styles.subtitle}>Enter The Information Of the Passengers</Text>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Class:</Text>
        <Text style={styles.value}>{travelClass || 'Economy'}</Text>
      </View>

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
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={addPassenger}>
        <Text style={styles.addButtonText}>Add Another Passenger</Text>
      </TouchableOpacity>

      <Text style={styles.passengerCount}>Passengers Added: {passengerCount}</Text>

      <Button
        title="Done Adding Passengers"
        onPress={() => {
          console.log('Passengers:', passengers);
          navigation.navigate('Checkout', { passengers }); // Navigate to CheckoutScreen
        }}
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
  detailContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    color: '#333',
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
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
  addButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  passengerCount: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default BookingScreen;
