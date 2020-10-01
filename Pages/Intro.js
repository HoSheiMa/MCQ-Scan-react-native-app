import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {_retrieveData, _storeData} from './assets/functions';

const w = Dimensions.get('screen').width;
const h = Dimensions.get('screen').height;
export default class Intro extends Component {
  async componentWillMount() {
    var isLogIn = await _retrieveData('isLogIn');
    if (isLogIn == 'true') {
      this.props.navigation.replace('UserDashBourd');
    }
  }
  render() {
    return (
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
            Welcome to {'\n'}
            MCQ Scan
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'flex-end',
            alignItems: 'center',
            padding: h * 0.1,
          }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.replace('Login');
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
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.replace('SignUp');
            }}>
            <View
              style={{
                backgroundColor: 'white',
                width: 250,
                height: 60,
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#ff7f56',
                  fontSize: 19,
                }}>
                Sign Up
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
