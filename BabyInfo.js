import React, { Component, startTransition, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, View, Pressable, Alert, TextInput, Modal, TouchableOpacity, Button, ImageBackground, FlatList } from 'react-native';


export default function BabyHInfo({ route, navigation }) {
  const records = route.params;
  console.log(records);
  const babyHealthRecords = JSON.parse(records);
  console.log(Object.values(babyHealthRecords));
  console.log(Array.isArray(babyHealthRecords));

  function dateString(props) {
    return  props.split('T');
  }

  function feeding(props) {
    if (props < 3) {
      return "Low feeding"
    } else if (props == 3) {
      return "average feeding"
    } else {
      return "High feeding"
    }
  }

  function temperature(props) {
    if (props > 37) {
      return "High temperature"
    } else if (props == 37) {
      return "Average temperature"
    } else {
      return "Low temperature"
    }
  }
  return (
    <View style={styles.body} >
      <View style={styles.container}>
        <View style={styles.flat}>
          <FlatList
            keyExtractor={item => item.id}
            data={babyHealthRecords}
            extraData={babyHealthRecords.length}
            renderItem={({ item }) => (
              <Text style={styles.item}>
                Weight: {item.weight}kg {'\n'}
                Height: {item.height} m {'\n'}
                Temperature: {item.temperature} celsius {'\n'}
                Feeding : {item.feeding} {feeding(item.feeding)}{'\n'}
                BMI: {item.weight / item.height} {'\n'}{'\n'}
                Record created: {'\n'}{dateString(item.created_at)}
              </Text>
            )}
          />
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: '#ff',
  },
  create: {
    fontStyle: 'bold',
    fontSize: 20,
    color: 'azure',
    padding: 20,
    backgroundColor: 'black',
  },
  heading: {
    fontStyle: 'bold',
    fontSize: 20,
    backgroundColor: 'lightgreen',
    padding: 20
  },
  information: {
    flexDirection: 'row',
    padding: 20,
  },
  infoText: {
    marginHorizontal: 20,
  },
  ansText: {
    backgroundColor: 'azure',
    marginBottom: 10,
    justifyContent: 'center'
  },
  list: {
    padding: 10,
  },
  textbox: {
    padding: 10,
  },
  body: {
    flexDirection: 'row',
    padding: 30,
    backgroundColor: 'skyblue',
  },
  button: {
    margin: 8,
    fontStyle: 'italic',
    fontSize: 30,
    color: 'white',
    padding: 5,
    backgroundColor: 'teal',
  },
  modal: {
    height: 300,
    alignContent: 'center'
  },
  flat: {
    backgroundColor: 'teal',
    color: 'teal',

  },
  item: {
    marginHorizontal: 10,
    marginTop: 24,
    padding: 30,
    color: 'teal',
    backgroundColor: 'azure',
    fontSize: 18,
  },
});
