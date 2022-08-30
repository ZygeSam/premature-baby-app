import React, { Component, startTransition, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, View, Pressable, Alert, TextInput, Modal, TouchableOpacity, Button, ImageBackground, FlatList } from 'react-native';


export default function ParentProfile({ route, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [age, setAge] = useState();
  const [name, setName] = useState();
  const [babies, setBabies] = useState();

  function allBabies(props) {
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    const url = "http://10.0.2.2/prematurebabyapp/api/babies?parent_id=" + props;
    fetch(url, {
      method: 'GET',
      headers: headers,
    }).then((response) => response.json())
      .then((response) => {
        setBabies(response);
        console.log(response);
      })
      .catch((error) => { console.error("ERROR:" + error); })
  }

  function Babies(props) {
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    fetch("http://10.0.2.2/prematurebabyapp/api/babies?id=" + props.id, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then((response) => {
        setBabies(response);
        return (babies);
      })
      .catch((error) => { console.error("ERROR:" + error); })
  }

  CreateBaby = (id) => {
    var Name = name.name;
    var Age = age.age;
    var Id = id
    if ((Name.length == 0) || (Age.length == 0)) {
      alert("Required Field Is Missing!");
    } else {
      var Data = {
        name: Name,
        age: Age,
        parent_id: Id
      };
      var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      fetch("http://10.0.2.2/prematurebabyapp/api/babies/add.php", {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data)
      })
        .then((response) => response.json())
        .then((response) => {
          if (alert(response)) {
            setModalVisible(!modalVisible);
          }

        })
        .catch((error) => { console.error("ERROR:" + error); })
    }
  }
  const { firstname, lastname, id } = route.params;
  return (
    <View style={styles.body} >
      <Modal
        stytle={styles.modal}
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Baby Form has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modal}>
          <View >
            <Text style={styles.heading}>Baby's data</Text>
          </View>
          <TextInput
            style={styles.textbox}
            placeholder='Name'
            onChangeText={name => setName({ name })}
          />
          <View style={styles.password}>
            <TextInput
              style={styles.textbox}
              placeholder='Age in weeks'
              onChangeText={age => setAge({ age })}
            />
          </View>
          <View>
            <Pressable
              style={styles.button}
              onPress={() => { CreateBaby(id) }}
            >
              <Text >Submit</Text>
            </Pressable>
          </View>
          <StatusBar style="auto" />
        </View>
      </Modal>
      <View style={styles.container}>
        <View style={styles.heading} >
          <Text>Premature Baby app</Text>
          <Text style={styles.heading}>Profile</Text>
        </View>
        <View style={styles.information}>
          <Text style={styles.infoText}>Name</Text>
          <Text style={styles.ansText}>{(firstname)}</Text>
        </View>
        <View style={styles.information}>
          <Text style={styles.infoText}>Name</Text>
          <Text style={styles.ansText}>{(lastname)}</Text>
        </View>
        <View style={styles.information}>
          <Text style={styles.infoText}>Babies</Text>
          <Text style={styles.ansText}>4</Text>
        </View>
        <View  >
          <Pressable
            style={styles.button}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.infoText}>Click Create baby profile</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => { allBabies(id) }}
          >
            <Text style={styles.infoText}>View Babies</Text>
          </Pressable>
        </View>
        <View style={styles.flat}>

          <FlatList
            data={babies}
            renderItem={({ item }) => (
              <Text style={styles.item}>{item.name}</Text>
            )}
          />

        </View>
        <StatusBar style="auto" />
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
  profile: {
    fontStyle: 'bold',
    fontSize: 20,
    backgroundColor: 'azure',
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
