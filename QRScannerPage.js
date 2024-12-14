import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const QRScannerPage = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedData, setScannedData] = useState(null);

  useEffect(() => {
    const getPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getPermission();
  }, []);

  const handleScan = ({ type, data }) => {
    const qrData = JSON.parse(data); 
    setScannedData(qrData);
    navigation.navigate('ScannedDataPage', { qrData });
  };
  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }return (
    <View style={styles.container}>
      <BarCodeScanner 
        onBarCodeScanned={scannedData ? undefined : handleScan} 
        style={StyleSheet.absoluteFillObject} 
      />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginTop: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default QRScannerPage;
