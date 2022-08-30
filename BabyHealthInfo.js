import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, TextInput, TouchableOpacity, Button, ImageBackground } from 'react-native';

export default class ParentSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      password: '',
    };
  }

  Login = () => {
    this.props.navigation.push("LogIn");
  }

  RegData = () => {
    var Firstname = this.state.firstname;
    var Lastname = this.state.lastname;
    var Username = this.state.username;
    var Password = this.state.password;


    if ((Password.length == 0) || (Firstname.length == 0) || (Lastname.length == 0) || (Username.length == 0)) {
      alert("Required Field Is Missing!");
    }


    else {

      var Data = {
        firstname: Firstname,
        lastname: Lastname,
        username: Username,
        password: Password
      };

      var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      var url = "http://10.0.2.2/prematurebabyapp/api/parents/add.php";
      fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data) //convert data to JSON
      })
        .then((response) => response.json())
        .then((response) => {
          alert(response);
          if (response == "Parent Created Successfully") {
            this.props.navigation.navigate("Dashboard");
          }
        })
        .catch((error) => {
          console.error("ERROR:" + error);
        })
    }
  }

  render() {
    return (
      <View style={styles.body} >
        <View style={styles.container}>

          <View >
            <Text style={styles.heading}>Register Parents</Text>
          </View>
          <View style={styles.input}>
            <TextInput
              style={styles.textbox}
              placeholder='Firstname'
              onChangeText={firstname => this.setState({ firstname })}
            />
            <TextInput
              style={styles.textbox}
              placeholder='Lastname'
              onChangeText={lastname => this.setState({ lastname })}
            />
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
              onPress={() => { this.RegData() }}
            >
              <Text >Register</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => { this.Login() }}
            ><Text >Login</Text>
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
