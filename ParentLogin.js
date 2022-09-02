import React, { useState, Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, TextInput, TouchableOpacity, Button } from 'react-native';

export default class ParentLogin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      secureTextEntry: true,
    };
  }

  Register = () => {
    this.props.navigation.navigate("SignUp");
  }

  LogInData = () => {
    var Username = this.state.username;
    var Password = this.state.password;

    if ((Username.length == 0) || (Password.length == 0)) {
      alert("Required Field Is Missing!");
    } else {
      var Data = {
        username: Username,
        password: Password
      };
      var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };

      fetch("http://10.0.2.2:8888/prematurebabyapp/api/parents/login.php", {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data)
      })
        .then((response) => response.json())
        .then((response) => {
          alert(response.message);
          if (response.message == "Loggedin Successfully") {
            this.props.navigation.navigate("Dashboard", response.data);
          }
        })
        .catch((error) => { console.error("ERROR:" + error); })
    }
  }

  render() {
    return (
      <View style={styles.body}>
        <View style={styles.container}>
          <View >
            <Text style={styles.heading}>Parents Login</Text>
          </View>
          <View style={styles.input}>
            <TextInput
              style={styles.textbox}
              placeholder='Username'
              onChangeText={username => this.setState({ username })}
            />
            <TextInput
              style={styles.textbox}
              placeholder='Password'
              onChangeText={password => this.setState({ password })}
            />
          </View>
          <View style={styles.click}>
            <Pressable
              style={styles.button}
              onPress={() => { this.LogInData() }}
            >
              <Text >Login</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => { this.Register() }}
            ><Text >Register</Text>
            </Pressable>
          </View>
          <StatusBar style="auto" />
        </View>
      </View>
    );
  }
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
    padding: 20,
    marginBottom: 30
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
  input: {
    marginHorizontal: 'auto',
    alignItems: 'center',
    justifyContent: 'center'
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    padding: 30,
    backgroundColor: 'skyblue',
  },
  click: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20
  }
});
