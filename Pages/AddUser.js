import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const w = Dimensions.get('screen').width;
const h = Dimensions.get('screen').height;
export default class AddUser extends Component {
  state = {
    error: false,
    loading: false,
    fname: null,
    lname: null,
    email: null,
    subject: null,
    phone: null,
    username: null,
    pass: null,
  };
  AddNow = () => {
    if (
      !this.state.fname |
      !this.state.lname |
      !this.state.email |
      !this.state.subject |
      !this.state.phone |
      !this.state.username |
      !this.state.pass
    )
      return;
    this.setState({
      loading: true,
    });
    firestore()
      .collection('Users')
      .where('email', '==', this.state.email)
      .get()
      .then(async (d) => {
        if (d.empty) {
          firestore()
            .collection('Users')
            .add({
              fname: this.state.fname,
              lname: this.state.lname,
              email: this.state.email,
              subject: this.state.subject,
              phone: this.state.phone,
              username: this.state.username,
              pass: this.state.pass,
              isAdmin: 'false',
            })
            .then((d) => {
              this.props.navigation.goBack();
            });
        } else {
          this.setState({
            error: true,
          });
        }
      });
  };
  render() {
    return (
      <KeyboardAvoidingView behavior={'position'}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <ImageBackground
            style={{
              width: 60,
              marginTop: w * 0.1,
              height: 60,
            }}
            source={require('./../assets/add.png')}
          />
        </View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 21,
            marginTop: 10,
          }}>
          Add New One
        </Text>
        <View
          style={{
            padding: 15,
          }}>
          <TextInput
            style={{
              borderBottomWidth: 1,
              marginBottom: 5,
              marginTop: 5,
            }}
            defaultValue={this.state.fname}
            placeholder="Frist Name"
            onChange={(d) => {
              this.setState({
                fname: d.nativeEvent.text,
              });
            }}
          />
          <TextInput
            style={{
              borderBottomWidth: 1,
              marginBottom: 5,
              marginTop: 5,
            }}
            defaultValue={this.state.lname}
            placeholder="Last Name"
            onChange={(d) => {
              this.setState({
                lname: d.nativeEvent.text,
              });
            }}
          />

          <TextInput
            style={{
              borderBottomWidth: 1,
              marginBottom: 5,
              marginTop: 5,
            }}
            style={{
              color: this.state.error ? 'red' : '#000',
            }}
            defaultValue={this.state.email}
            placeholder="Email"
            onChange={(d) => {
              this.setState({
                email: d.nativeEvent.text,
              });
            }}
          />
          <TextInput
            style={{
              borderBottomWidth: 1,
              marginBottom: 5,
              marginTop: 5,
            }}
            defaultValue={this.state.phone}
            placeholder="Phone No."
            onChange={(d) => {
              this.setState({
                phone: d.nativeEvent.text,
              });
            }}
          />
          <TextInput
            style={{
              borderBottomWidth: 1,
              marginBottom: 5,
              marginTop: 5,
            }}
            defaultValue={this.state.subject}
            placeholder="Subject"
            onChange={(d) => {
              this.setState({
                subject: d.nativeEvent.text,
              });
            }}
          />
          <TextInput
            style={{
              borderBottomWidth: 1,
              marginBottom: 5,
              marginTop: 5,
            }}
            defaultValue={this.state.username}
            placeholder="Username"
            onChange={(d) => {
              this.setState({
                username: d.nativeEvent.text,
              });
            }}
          />
          <TextInput
            style={{
              borderBottomWidth: 1,
              marginBottom: 5,
              marginTop: 5,
            }}
            onChange={(d) => {
              this.setState({
                pass: d.nativeEvent.text,
              });
            }}
            secureTextEntry={true}
            placeholder="Password"
          />
          <TouchableOpacity
            style={{
              alignItems: 'center',
              marginTop: 15,
            }}
            onPress={() => {
              // eslint-disable-next-line react/prop-types
              this.AddNow();
            }}>
            <View
              style={{
                backgroundColor: '#ff7f56',
                width: 250,
                height: 60,
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 8,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 19,
                }}>
                add
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              marginTop: 15,
            }}
            onPress={() => {
              // eslint-disable-next-line react/prop-types
              this.props.navigation.goBack();
            }}>
            <View
              style={{
                backgroundColor: '#ff7f56',
                width: 250,
                height: 60,
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 8,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 19,
                }}>
                Back
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
