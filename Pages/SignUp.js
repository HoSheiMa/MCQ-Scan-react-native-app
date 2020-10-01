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
import {_retrieveData, _storeData} from './assets/functions';

const w = Dimensions.get('screen').width;
const h = Dimensions.get('screen').height;
export default class SignUp extends Component {
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
  signUpFun = () => {
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
              password: this.state.pass,
              isAdmin: 'false',
            })
            .then((d) => {
              this.Login();
            });
        } else {
          this.setState({
            error: true,
          });
        }
      });
  };
  Login = () => {
    var email = this.state.email;
    var password = this.state.pass;
    if (!password || !email) return;
    this.setState({
      loading: true,
    });
    firestore()
      .collection('Users')
      .where('email', '==', email)
      .get()
      .then(async (d) => {
        if (!d.empty) {
          var userData = d.docs[0].data();
          if (userData['password'] == password) {
            this.setState({
              error: false,
              loading: false,
            });
            // login success
            await _storeData('isLogIn', 'true');
            await _storeData('userData', JSON.stringify(userData));
            await _storeData('isAdmin', userData.isAdmin);

            this.props.navigation.replace('UserDashBourd');
          } else {
            return false;
          }
        } else {
          return false;
        }
      });
  };
  render() {
    return (
      <KeyboardAvoidingView behavior={'position'}>
        <View
          style={{
            width: w,
            height: h,
          }}>
          <ImageBackground
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}
            source={require('../assets/bg.jpg')}></ImageBackground>
          <View
            style={{
              width: '100%',
              height: '100%',
              flex: 1,
              paddingTop: 5,
              alignItems: 'center',
              position: 'absolute',
            }}>
            <ImageBackground
              style={{
                width: 50,
                height: 50,
                marginBottom: 20,
              }}
              source={require('../assets/Book-icon-orange.png')}></ImageBackground>
            <Text
              style={{
                padding: 0,
                margin: 0,
                fontSize: 32,
                textAlign: 'center',
                color: '#fff',
                textShadowRadius: 30,
                textShadowColor: '#000',
              }}>
              Welcome to Sugn Up
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              height: '100%',
              flex: 1,
              zIndex: 990,
              justifyContent: 'flex-end',
              paddingBottom: w * 0.1,
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 26,
                height: 600,
                padding: 15,
              }}>
              {this.state.loading ? (
                <View
                  style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text>Loading...</Text>
                </View>
              ) : (
                <View>
                  <Text
                    style={{
                      fontSize: 22,
                    }}>
                    Sign Up
                  </Text>
                  <TextInput
                    style={{
                      borderBottomWidth: 1,
                      marginBottom: 5,
                      marginTop: 5,
                    }}
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
                    placeholder="Last Name"
                    onChange={(d) => {
                      this.setState({
                        lname: d.nativeEvent.text,
                      });
                    }}
                  />

                  <TextInput
                    placeholder="Email"
                    style={{
                      borderBottomWidth: 1,
                      marginBottom: 5,
                      marginTop: 5,
                      color: this.state.error ? 'red' : '#000',
                    }}
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
                      this.signUpFun();
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
                        Sign Up
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
