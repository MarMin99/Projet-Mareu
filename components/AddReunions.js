import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, Button, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ReactChipsInput from 'react-native-chips';


import firebase from '../firebase';

const { heigh, width } = Dimensions.get('window');


export function addReunionDb(sujet,lieu,participants,date){
    const dateTime = date.toGMTString();
    firebase.database().ref('/reunion').push({sujet,lieu,participants,dateTime});
  }

const AddReunions = ({ navigation }) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [sujet, setSujet] = useState('');
    const [lieu, setLieu] = useState('');
    const [chipsd, setChips] = useState([ ]);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };
    return (
        <View style={styles.container}>
          <Text style={styles.pageTitle}>Ajout d'une Reunion</Text>
          <View style={styles.card}>
              <TextInput 
                
                style={styles.input} 
                placeholder="Sujet de la reunion" 
                onChangeText={(text)=>{
                  setSujet(text);
                }}
                value={sujet}
              />
              <TextInput 
                style={styles.input} 
                placeholder="Salle"
                onChangeText={(text)=>{
                  setLieu(text);
                }}
                value={lieu}
              />
              <ReactChipsInput 
                  label="Entrez les participants:" 
                  onChangeChips={(chips) => {
                    setChips([...chipsd, ...chips]);
                    chips=[...chipsd];
                    console.log(chips);
                  }}
                      
                  chipStyle={{  
                      backgroundColor: '#00acc1', 
                  }} 
                  inputStyle={[styles.input,styles.chips]}
                  multiline       
              />

              <View style={styles.dateTimeButton}>
                  < TouchableOpacity style={styles.dateheure} onPress={showDatepicker}>
                  <Text>Date</Text>
                    </TouchableOpacity>
                  <TouchableOpacity style={styles.dateheure} onPress={showTimepicker}>
                    <Text>Heur</Text>
                  </TouchableOpacity>

              </View>
              {show && (
                  <DateTimePicker
                      testID="dateTimePicker"
                      timeZoneOffsetInMinutes={0}
                      value={date}
                      mode={mode}
                      is24Hour={true}
                      display="default"
                      onChange={onChange}
                  />
              )}
              
              <TouchableOpacity style = {styles.button} onPress={()=>{
                    addReunionDb(sujet,lieu,chipsd,date)
                    setDate(new Date());
                    setLieu('');
                    setSujet('');
                    setChips([]);
                    navigation.navigate("Liste des Reunions")
                  }}>
                  <Text style = {styles.buttonText}>Enregistrer</Text>
              </TouchableOpacity>
          </View>
        </View>
    );

}

export default AddReunions

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0277bd',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  card:{
    flex: 1,
    alignItems: 'center',
  },
  pageTitle: {
    color: '#000',
    fontSize: 36,
    marginTop: 60,
    marginBottom: 30,
    fontWeight: '300'
  },
  input: {
    width: width - 25,
    marginTop: 20,
    padding: 10,
    borderBottomColor: '#00acc1',
    borderWidth: 1,
    fontSize: 24,
    color: 'black',
  },
  chips:{
    height:60,
  },
  
  dateheure:{
    alignItems: 'center',
    justifyContent: 'center',
    flex:1,
    backgroundColor:'#00acc1',
    height:40,
    margin:20,
    borderRadius:10,
  },
  about:{
    marginBottom : 20,
    height: 100,
  },
  button:{
    marginTop: 20,
    backgroundColor:'#006064',
    width: 130,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  piker:{
    backgroundColor:'#00acc1',
    height: 60,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex:1,
    margin:15,
  },
  dateTimeButton:{
    height: 60,
    width:width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    
    
  },
  buttonText:{
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  }
});