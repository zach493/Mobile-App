import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';

const ScannerScreen = () => {
  const navigation = useNavigation();

  const handleBarCodeScanned = ({ type, data }) => {
    const parsedData = JSON.parse(data);
    navigation.navigate('ScannedInfoScreen', { data: parsedData });
  };

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <Text style={styles.instructions}>Scan the QR Code</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructions: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default ScannerScreen;