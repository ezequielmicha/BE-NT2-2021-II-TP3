import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default (properties) => {
const minutes = parseInt(properties.tiempoRestante/60)
const seconds = properties.tiempoRestante % 60
const add0 = number => number < 10 ? "0" : ""

return (
    <Text style={styles.text}>
        {add0(minutes)}{minutes}:{add0(seconds)}{seconds}
    </Text>
)}

const styles = StyleSheet.create({
    text: {
        fontSize: 50,
        fontWeight: "bold",
        fontFamily: "Arial",
        color: "red"        
        
    }, 
}); 
