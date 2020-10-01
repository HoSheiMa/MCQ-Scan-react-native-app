import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  AsyncStorage,
} from 'react-native';
import {_retrieveData, _storeData} from './assets/functions';

import firestore from '@react-native-firebase/firestore';

const w = Dimensions.get('screen').width;
const h = Dimensions.get('screen').height;
export default class Login extends Component {
  state = {
    error: false,
    loading: false,
    email: null,
    pass: null,
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
            console.log('ssas');
            this.setState({
              error: true,
              loading: false,
            });
          }
        } else {
          this.setState({
            error: true,
            loading: false,
          });
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
              paddingTop: h * 0.2,
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
              Log In
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
                height: 300,
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
                    Welcome Back
                  </Text>
                  <TextInput
                    onChange={(d) => {
                      this.setState({
                        email: d.nativeEvent.text,
                      });
                    }}
                    style={{
                      borderBottomWidth: 1,
                      marginBottom: 5,
                      marginTop: 5,
                    }}
                    placeholder="Email"
                  />
                  <TextInput
                    onChange={(d) => {
                      this.setState({
                        pass: d.nativeEvent.text,
                      });
                    }}
                    style={{
                      borderBottomWidth: 1,
                      marginBottom: 5,
                      marginTop: 5,
                    }}
                    secureTextEntry={true}
                    placeholder="Password"
                  />

                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Forget')}>
                    <Text
                      style={{
                        textAlign: 'right',
                        color: '#ff7f56',
                      }}>
                      Forget Password
                    </Text>
                  </TouchableOpacity>
                  {this.state.error ? (
                    <Text
                      style={{
                        color: '#d90429',
                        margin: 6,
                      }}>
                      Error: this email or password not correct!, try again
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
                      this.Login();
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
                        Log In
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
