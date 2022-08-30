import React, { Component, startTransition } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Alert, TextInput, Modal, TouchableOpacity, Button, ImageBackground } from 'react-native';

export default class BabyProfile extends Component {
  state = {
    modalVisible: false
  };
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
  render() {
    const { modalVisible } = this.state;
    return (
      <View style={styles.body} >
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Baby Health Form has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.container}>
            <View >
              <Text style={styles.heading}>Emmanuel data</Text>
            </View>
            <TextInput
              style={styles.textbox}
              placeholder='Weight'
              onChangeText={name => this.setState({ weight })}
            />
            <TextInput
              style={styles.textbox}
              placeholder='HeightWeight'
              onChangeText={name => this.setState({ height })}
            />
            <View style={styles.password}>
              <TextInput
                style={styles.textbox}
                placeholder='Temperature'
                onChangeText={page => this.setState({ temperature })}
              />
            </View>
            <View style={styles.password}>
              <TextInput
                style={styles.textbox}
                placeholder='Feeding on a scale of one to 10'
                onChangeText={page => this.setState({ feeding })}
              />
            </View>
            <View>
              <Pressable
                style={styles.button}
                onPress={() => { }}
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
            <Text style={styles.ansText}>Emmanuel</Text>
          </View>
          <View style={styles.information}>
            <Text style={styles.infoText}>Email</Text>
            <Text style={styles.ansText}>Emmanuel@manuel.com</Text>
          </View>
          <View style={styles.information}>
            <Text style={styles.infoText}>Babies</Text>
            <Text style={styles.ansText}>2</Text>
          </View>
          <View  >
            <Pressable
              style={styles.button}
              onPress={() => this.setModalVisible(true)}
            >
              <Text style={styles.infoText}>Click Create baby profile</Text>
            </Pressable>
          </View>
          <View style={styles.ansText} >
            <Pressable
              style={styles.list}
              onPress={() => { }}
            >
              <Text >Emmanuel</Text>
            </Pressable>
            <Pressable
              style={styles.list}
              onPress={() => { }}
            >
              <Text >Daniel</Text>
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
    flex: 1,
    marginTop: 10,
    backgroundColor: '#ff',
    padding: 1
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
    color: 'azure',
    padding: 5,
    backgroundColor: 'blue',
  }
});
