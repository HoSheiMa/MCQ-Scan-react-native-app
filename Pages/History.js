import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {_retrieveData, _storeData} from './assets/functions';
import firestore from '@react-native-firebase/firestore';

const w = Dimensions.get('screen').width;
const h = Dimensions.get('screen').height;

export default class History extends Component {
  state = {
    messages: [],
    loading: true,
  };

  async componentDidMount() {
    var userId = JSON.parse(await _retrieveData('userData'))['email'];

    var isAdmin = await _retrieveData('isAdmin');
    if (isAdmin == 'true') {
      firestore()
        .collection('History')
        .get()
        .then(async (d) => {
          var messages = [];
          d.docs.forEach((u) => {
            messages.push(u.data());
          });
          this.setState({
            messages: messages,
            loading: false,
          });
        });
    } else {
      firestore()
        .collection('History')
        .where('userId', '==', userId)
        .get()
        .then(async (d) => {
          var messages = [];
          d.docs.forEach((u) => {
            messages.push(u.data());
          });
          this.setState({
            messages: messages,
            loading: false,
          });
        });
    }
  }

  render() {
    return (
      <ScrollView>
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
            source={require('./../assets/notepad.png')}
          />
        </View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 21,
            marginTop: 10,
          }}>
          History
        </Text>

        {this.state.loading ? (
          <Text style={{textAlign: 'center', marginTop: 15}}>loading</Text>
        ) : (
          this.state.messages.map((d) => {
            return (
              <View
                style={{
                  width: w,
                  padding: 25,
                  backgroundColor: '#fff',
                  // elevation: 1,
                  marginTop: 25,
                }}>
                <Text>{d['message']} </Text>
                <Text
                  style={{
                    color: '#aaa',
                  }}>
                  {d['date']}
                </Text>
              </View>
            );
          })
        )}
      </ScrollView>
    );
  }
}
