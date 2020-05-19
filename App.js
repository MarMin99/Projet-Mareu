import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListReunions from './components/ListReunions';
import Home from './components/Home';
import AddReunions from './components/AddReunions';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';

const Stack = createStackNavigator();

export default function App  ()  {
  const state = createStore(reducers,{},applyMiddleware(ReduxThunk))
    return (
      <Provider store={state}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Liste des Reunions" component={ListReunions} />
            <Stack.Screen name="Ajouter une Reunion" component={AddReunions} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      
    );
}
