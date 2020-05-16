import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, ImageBackground} from 'react-native';
import { Container, Header, Title, Button, Left, Right, Body, Icon } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FacebookLogin from './FacebookLogin';

export default function App() {

  const Stack = createStackNavigator();

  return (
    <FacebookLogin/>
  );
}

