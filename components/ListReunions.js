import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import firebase from '../firebase';
import _ from 'lodash';
import {Icon} from 'react-native-elements';
import { startAsync } from 'expo/build/AR';


export default function ListReunions(){
    const [liste, setListe] = useState();
    function getReunion(){
        firebase.database().ref('/reunion').on('value', function(snapshot) {
            const listOfR = _.map(snapshot.val(), (val, key) =>{
                return {
                    ...val,
                    key:key
                }   
            })
            setListe(listOfR)   
        });
    }
    function suppReu(key){
        firebase.database().ref(`/reunion/${key}`).remove();
    
    }

    return(
        <View style={styles.container}>
            <View style={{flex:1}}>
                <FlatList
                    data={liste}
                    keyExtractor={(item)=>item.key}
                    renderItem={({item}) =>{
                        return(
                            <View style={styles.list}>
                                <View style={styles.reu}>
                                    <Text style={{color:'black'  ,fontSize: 20}}>{item.sujet}</Text>
                                    <Text style={{color:'black' ,}}>Salle: {item.lieu}</Text>
                                    <Text style={{color:'black'}}>{item.dateTime}</Text>
                                    
                                    <Text style={{color:'black'}}>{item.participants}</Text>
                                </View>
                                <View style={styles.supp}>
                                    <Icon name='close'
                                        color='red' type='material' size={30}
                                        onPress={()=>{suppReu(item.key)}}
                                    />
                                </View>
                            </View>
                        )
                    }}
                />
            </View>
            <View style={styles.actu}>
                <TouchableOpacity 
                    onPress={getReunion} style={styles.refresh}>
                        <Text style={{color:'white'}}>Actualliser la Liste!</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor:'#0277bd'
      
    },

    refresh:{
        marginTop: 20,
        backgroundColor:'#006064',
        width: 150,
        height: 60,
        borderRadius: 10,
        fontSize: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },

    actu:{
        margin: 20,
        
        justifyContent: 'flex-end',
    },
    list:{
        flex:1,
        margin:10,
        flexDirection:'row',
        width:300,
        borderColor:'black',
        borderRadius:10,
        backgroundColor:'white',
        justifyContent:'space-between'
    },
    supp:{
        
        justifyContent: 'center',
        alignItems: 'flex-end',
        
    },
    reu:{
        paddingLeft:10,
        paddingTop:10,
        paddingBottom:10,
    }
});