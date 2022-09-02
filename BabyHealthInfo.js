import React, { Component, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, TextInput, TouchableOpacity, Button, ImageBackground } from 'react-native';

export default function ParentSignup({ route, navigation }) {
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [feeding, setFeeding] = useState();
  const [temperature, setTemperature] = useState();
  const baby = route.params;

  function CollectData(id) {
    console.log(id)
    var Weight = weight.weight;
    var Height = height.height;
    var Feeding = feeding.feeding;
    var Temperature = temperature.temperature;
    var Id = id


    if ((Weight.length == 0) || (Height.length == 0) || (Feeding.length == 0) || (Temperature.length == 0)) {
      alert("Required Field Is Missing!");
    }


    else {

      var Data = {
        weight: Weight,
        height: Height,
        feeding: Feeding,
        temperature: Temperature,
        baby_id: Id
      };
      console.log(Data)
      var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      var url = "http://10.0.2.2:8888/prematurebabyapp/api/babyhealth/add.php";
      fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data) //convert data to JSON
      })
        .then((response) => response.json())
        .then((response) => {
          alert(response)
          console.log(response);
        })
        .catch((error) => {
          console.error("ERROR:" + error);
        })
    }
  }
  function ViewData(id) {
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    var url = "http://10.0.2.2:8888/prematurebabyapp/api/babyhealth?id=" + id;
    fetch(url, {
      method: 'GET',
      headers: headers
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        navigation.navigate("BabyInfo", response);
      })
      .catch((error) => {
        console.error("ERROR:" + error);
      })
  }

  return (
    <View style={styles.body} >
      <View style={styles.container}>

        <View >
          <Text style={styles.heading}>Collect Data</Text>
        </View>
        <View style={styles.input}>
          <TextInput
            style={styles.textbox}
            placeholder='Weight in kg'
            onChangeText={weight => setWeight({ weight })}
          />
          <TextInput
            style={styles.textbox}
            placeholder='Height in m'
            onChangeText={height => setHeight({ height })}
          />
          <TextInput
            style={styles.textbox}
            placeholder='Feeding: Rate on a scale of 1 to 5'
            onChangeText={feeding => setFeeding({ feeding })}
          />
          <TextInput
            style={styles.textbox}
            placeholder='Temperature'
            onChangeText={temperature => setTemperature({ temperature })}
          />
        </View>
        <View style={styles.click}>
          <Pressable
            style={styles.button}
            onPress={() => { CollectData(baby.id) }}
          >
            <Text >Submit</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => { ViewData(baby.id) }}
          >
            <Text >View Data</Text>
          </Pressable>
        </View>
        <StatusBar style="auto" />
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: '#ff',
    justifyContent: 'center',
  },
  heading: {
    fontStyle: 'bold',
    fontSize: 20,
    backgroundColor: 'azure',
    padding: 20
  },
  button: {
    fontStyle: 'bold',
    marginTop: 20,
    padding: 15,
    width: 100,
    borderRadius: 5,
    borderColor: 'black',
    backgroundColor: 'orange',
  },
  textbox: {
    width: 300,
    borderBottomWidth: 1,
    borderColor: 'black',
    padding: 10,
    fontSize: 18
  },
  password: {
    flexDirection: 'row',
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    padding: 30,
    backgroundColor: 'skyblue',
  },
  input: {
    marginHorizontal: 'auto',
    alignItems: 'center',
    justifyContent: 'center'
  },
  click: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20
  }
});
