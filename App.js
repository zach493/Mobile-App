import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LaunchScreen from './LaunchScreen';
import MainPage from './MainPage';
import TicketDetail from './TicketDetail';
import BookingScreen from './BookingScreen';
import CheckoutScreen from './CheckoutScreen'; 
import QRCodeScreen from './QRCodeScreen';
import QRScannerPage from './QRScannerPage';
import ScannedDataPage from './ScannedDataPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Launch">
        <Stack.Screen
          name="Launch"
          component={LaunchScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="QRScannerPage"
          component={QRScannerPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="TicketDetail" 
          component={TicketDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Booking" 
          component={BookingScreen} 
          options={{ title: 'Book Your Flight', headerShown: true }}
        />
        <Stack.Screen 
          name="Checkout" 
          component={CheckoutScreen} 
          options={{ title: 'Checkout', headerShown: true }}
        />
         <Stack.Screen 
          name="QRCodeScreen" 
          component={QRCodeScreen} 
          options={{ title: 'QR Code Screen' }}
        />
        <Stack.Screen 
        name="ScannedDataPage" 
        component={ScannedDataPage}
        options={{ title: 'Scanned Data' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
