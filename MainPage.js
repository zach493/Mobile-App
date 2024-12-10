import React, { useRef, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, Image, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const IMAGE_WIDTH = width * 0.75;
const SPACING = width * 0.25;

const images = [
  { id: '1', uri: require('./img/water.jpg') },
  { id: '2', uri: require('./img/watmat.jpg') },
  { id: '3', uri: require('./img/cebu.jpg') },
];

const tickets = [
  { id: '1', date: 'Wed, Dec 11', route: 'MNL -> CGY | Cebu Pacific Air' },
  { id: '2', date: 'Wed, Nov 27', route: 'MNL -> ILO | Philippine Air Asia' },
  { id: '3', date: 'Wed, Dec 4', route: 'MNL -> SJI | Cebgo' },
  { id: '4', date: 'Thu, Jan 9', route: 'MNL -> DRP | Philippine Airlines' },
  { id: '5', date: 'Tue, Nov 19', route: 'MNL -> KLO | Philippine Airlines' },
];

export default function MainPage() {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef();

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % images.length;
      flatListRef.current.scrollToIndex({ index, animated: true });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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
        ref={flatListRef}
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
      <Text style={styles.showAllText}>Show all</Text>
      <FlatList
      data={tickets}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('TicketDetail', { ticket: item })}
    >
      <View style={styles.ticket}>
        <Text style={styles.ticketDate}>{item.date}</Text>
        <Text style={styles.ticketRoute}>{item.route}</Text>
      </View>
    </TouchableOpacity>
  )}
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
    marginTop: 70,
    marginBottom: 16,
    textAlign: 'center',
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
  showAllText: {
    fontSize: 14,
    color: '#007bff',
    textAlign: 'right',
    marginBottom: 16,
  },
  ticket: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  ticketDate: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ticketRoute: {
    fontSize: 14,
    color: '#555',
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
