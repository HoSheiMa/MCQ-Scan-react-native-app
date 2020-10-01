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
import {_retrieveData, _storeData} from './assets/functions';
import ImagePicker from 'react-native-image-picker';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import RNFetchBlob from 'react-native-fetch-blob';
import storage from '@react-native-firebase/storage';

const w = Dimensions.get('screen').width;
const h = Dimensions.get('screen').height;

export default class Forget extends Component {
  state = {
    Send: false,
    newpass: null,
    email: null,
    error: false,
    success: false,
    code: Math.floor(Math.random() * 2353512332),
    Wcode: null,
  };

  send = () => {
    // console.log(this.state.newpass, this.state.email, this.state.code);
    if (this.state.newpass && this.state.email && this.state.code) {
      fetch(
        `https://sms-api-react-native.000webhostapp.com/SendRestCode.php?code=${this.state.code}&email=${this.state.email}&key=admin00029921421`,
      ).then(async (d) => {
        d = await d.text();
        console.log(d);
        this.setState({
          Send: true,
        });
      });
    }
  };
  updatePassword = () => {
    if (this.state.code != this.state.Wcode) {
      this.setState({
        error: true,
      });
      return;
    }
    var email = this.state.email;
    firestore()
      .collection('Users')
      .where('email', '==', email)
      .get()
      .then((d) => {
        var person = d.docs[0].id;
        firestore()
          .collection('Users')
          .doc(person)
          .update({
            password: this.state.newpass,
          })
          .then(() => {
            this.props.navigation.goBack();
          });
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
            source={require('./../assets/reading-book.png')}
          />
        </View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 21,
            marginTop: 10,
          }}>
          Forget password
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
            defaultValue={this.state.email}
            placeholder="email"
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
            defaultValue={this.state.newpass}
            placeholder="new password"
            onChange={(d) => {
              this.setState({
                newpass: d.nativeEvent.text,
              });
            }}
          />
          {this.state.Send ? (
            <TextInput
              style={{
                borderBottomWidth: 1,
                marginBottom: 5,
                marginTop: 5,
              }}
              defaultValue={this.state.Wcode}
              placeholder="code"
              onChange={(d) => {
                this.setState({
                  Wcode: d.nativeEvent.text,
                });
              }}
            />
          ) : (
            <View />
          )}

          {this.state.error ? (
            <Text
              style={{
                color: '#d90429',
                margin: 6,
              }}>
              Error: this code is uncorrect!!!
            </Text>
          ) : (
            <View />
          )}

          <TouchableOpacity
            style={{
              alignItems: 'center',
              marginTop: 15,
            }}
            onPress={() => {
              // eslint-disable-next-line react/prop-types
              if (!this.state.Send) {
                this.send();
              } else {
                this.updatePassword();
              }
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
                elevation: 3,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 19,
                }}>
                {this.state.Send ? 'update' : 'Send Code'}
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
                backgroundColor: '#fff',
                width: 250,
                height: 60,
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 8,
                elevation: 3,
              }}>
              <Text
                style={{
                  color: '#000',
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
