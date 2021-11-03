import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Pomodoro from './components/Pomodoro';

import {vibrate} from './utils'

let minTrabajo = 0.2;
let minDescanso = 0.1;
const minToSec = min => min * 60;
var interval;

export default function App() {
  const [timerActivo, setTimerActivo] = useState(true);
  const [enTrabajo, setEnTrabajo] = useState(true);
  const [tiempoRestante, setTiempoRestante] = useState(minToSec(minTrabajo));
  
  useEffect(() => {
    if (tiempoRestante === 0){
      vibrate();
      setTiempoRestante(enTrabajo ? minToSec(minDescanso) : minToSec(minTrabajo));
      setEnTrabajo(prev => !prev);
    };
  }, [tiempoRestante]);

  useEffect(() => {
    if (timerActivo){
      clearInterval(interval)
    } 
    else {
      interval = setInterval(() => {
        setTiempoRestante(prev => prev - 1)
      }, 1000);
    }
  }, [timerActivo]);

  const resete = () => {
    clearInterval(interval)
    setEnTrabajo(true)
    setTiempoRestante(minToSec(minTrabajo))
    setTimerActivo(!timerActivo)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}> Es tiempo de {(enTrabajo) ? "trabajar" : "descansar"} </Text>
      
      <Pomodoro tiempoRestante={tiempoRestante} />
      
      <View style={styles.buttonContainer}> 
        <Button title={(!timerActivo) ? "Pausar" : "Iniciar"} onPress={() => setTimerActivo(!timerActivo)}> </Button>
        <Button title={"Resetear"} onPress={resete}> </Button>
      </View>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 100
  },
  buttonContainer: {
    marginTop: 25,
    padding: 10,
    flexDirection: 'row',
  },
  text: {
    fontSize: 30,
    fontFamily: "Arial",
    color: "green",
    padding: 20,        
}, 
});
