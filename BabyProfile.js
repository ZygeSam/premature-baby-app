import React, { Component, startTransition, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, View, Pressable, Alert, TextInput, Modal, TouchableOpacity, Button, ImageBackground, FlatList } from 'react-native';


export default function BabyProfile({ route, navigation }) {

  const baby = route.params;
  console.log(baby);
  const babies = JSON.parse(baby);
  console.log(baby);
  console.log(Object.values(babies));
  console.log(Array.isArray(babies));

  function Baby(id) {
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    const url = "http://10.0.2.2:8888/prematurebabyapp/api/babies?id=" + id;
    fetch(url, {
      method: 'GET',
      headers: headers,
    }).then((response) => response.json())
      .then((response) => {
        navigation.push("BabyHealthInfo", response);
      })
      .catch((error) => { console.error("ERROR:" + error); })
  }

  return (
    <View style={styles.container}>
      <View style={styles.flat}>
        <FlatList
          keyExtractor={item => item.id}
          data={babies}
          extraData={babies.length}
          renderItem={({ item }) => (
            <Pressable
              style={styles.button}
              onPress={() => { Baby(item.id) }}
            >
              <Text style={styles.item}>
                Name: {item.name}    {'\n'}  Age: {item.age}
              </Text>
            </Pressable>
          )}
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: 'yellow',
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
    color: 'teal'
  },
  item: {
    marginHorizontal: 10,
    marginTop: 24,
    padding: 30,
    color: 'teal',
    backgroundColor: 'azure',
    fontSize: 24,
  },
});
