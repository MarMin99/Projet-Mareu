import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ListReunion from './ListReunions';
export default  function Home  ({ navigation })  {
  //const [modalVisible, setModalVisible] = useState(false);
  return (
      <View
        style={styles.container}>
          <View style={styles.binv}>
            <Text style={styles.texte}>Bienvenus dans Votre Gestionnaire de reunions !</Text>
          </View>
          <View style={styles.homebtn}>
          <LinearGradient style={styles.btnAdd} colors={['#006064', '#00acc1']}>
            <TouchableOpacity 
                onPress = {()=> navigation.navigate("Ajouter une Reunion")}>
                    <Text style={styles.btntext}>Ajouter une Réunion</Text>
            </TouchableOpacity>
            
          </LinearGradient>
          <LinearGradient style={styles.btnAdd} colors={['#006064', '#00acc1']}>
                <TouchableOpacity 
                    onPress={() => navigation.navigate("Liste des Reunions")} >
                        <Text style={styles.btntext}>Liste des Reunions</Text>
                </TouchableOpacity>
            </LinearGradient>
          </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#0277bd'
  },
  btnAdd:{
    margin: 20,
    width : 150,
    height : 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,

  },
  btntext:{
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  texte:{
    color: 'black',
    fontSize : 30,
    textAlign: 'center',
  },

  homebtn:{
    flex:1,
    flexDirection: 'row'
  },

  binv:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
