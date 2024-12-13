import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Modal, Animated, Dimensions } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
const { width } = Dimensions.get('window');
const IMAGE_WIDTH = width * 0.75;
const SPACING = width * 0.25;

const images = [
  { id: '1', uri: require('./img/water.jpg') },
  { id: '2', uri: require('./img/watmat.jpg') },
  { id: '3', uri: require('./img/cebu.jpg') },
];

export default function MainPage() {
  const navigation = useNavigation();
  const [flights, setFlights] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null); // Make sure to initialize ref as null

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (flatListRef.current) { // Check if flatListRef is available before calling scrollToIndex
        index = (index + 1) % images.length;
        flatListRef.current.scrollToIndex({ index, animated: true });
      }
    }, 3000);

    

    const fetchFlights = async () => {
      try {
        const response = await axios.get('https://9dab-2001-4455-25a-4e00-3581-6d58-65aa-754c.ngrok-free.app/flight_info'); // Use Axios directly without https import
        console.log('Flights fetched successfully:', response.data);
        setFlights(response.data);
      } catch (error) {
        console.error('Error fetching flight data:', error.message);
        if (error.response) {
          console.error('Response error:', error.response.data);
        } else if (error.request) {
          console.error('Request error:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
      }
    };

    fetchFlights();

    return () => clearInterval(interval); // Clear the interval when the component is unmounted
  }, []);

  const renderTicket = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('TicketDetail', { flightId: item.ID })}
      style={styles.ticket}
    >
      <View style={styles.ticketHeader}>
        <Text style={styles.ticketDate}>{moment(item.Date).format('YYYY-MM-DD')}</Text>
      </View>
      <Text style={styles.ticketRoute}>
        {item.AirportOrigin} To {item.AirportDest}
      </Text>
      <Text style={styles.ticketType}>{item.type}</Text>
    </TouchableOpacity>
  );
  

  return (
    <View style={styles.container}>
      <View style={styles.topButtons}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('./img/logo-back.png')} style={styles.logoImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={openModal}>
          <Text style={styles.calendarText}>📅</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.header}>Popular Destinations In The Philippines</Text>

      <Animated.FlatList
        ref={flatListRef} // Correctly set ref here
        data={images}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={IMAGE_WIDTH + SPACING}
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={item.uri} style={styles.destinationImage} />
          </View>
        )}
      />
      <Text style={styles.header}>Available Tickets</Text>

      <FlatList
        data={flights}
        keyExtractor={(item) => item.ID.toString()}
        renderItem={renderTicket}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ticketList}
      />

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Filter Flights</Text>
            <Text>Filter by date, destination, airline, etc.</Text>
            <TouchableOpacity style={styles.modalCloseButton} onPress={closeModal}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  topButtons: {
    top: 46,
    left: 6,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
    marginBottom: 20,
  },
  imageContainer: {
    width: IMAGE_WIDTH,
    marginRight: SPACING / 2,
  },
  destinationImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  logoImage: {
    width: 30,
    height: 30,
  },
  calendarText: {
    fontSize: 29,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  ticket: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ticketDate: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  airlineLogo: {
    width: 40,
    height: 40,
  },
  ticketRoute: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  ticketType: {
    fontSize: 12,
    color: '#777',
  },
  ticketList: {
    paddingBottom: 100, // Ensure space at the bottom when scrolling
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: '40%',
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalCloseButton: {
    marginTop: 20,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#000',
    borderRadius: 5,
  },
  modalCloseButtonText: {
    color: '#fff',
  },
});
