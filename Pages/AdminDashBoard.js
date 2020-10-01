import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {_retrieveData, _storeData} from './assets/functions';

const w = Dimensions.get('screen').width;
const h = Dimensions.get('screen').height;
export default class AdminDashBoard extends Component {
  state = {
    found: false,
    loading: true,
    users: null,
  };
  async componentDidMount() {
    var userData = await _retrieveData('userData');
    this.setState(userData ? JSON.parse(userData) : {});
    this.GetUsers();
  }
  logout = async () => {
    await _storeData('isLogIn', 'false');
    await _storeData('userData', '{}');
    await _storeData('isAdmin', 'false');
    this.props.navigation.replace('Intro');
  };

  GetUsers = () => {
    console.log('s');
    this.setState({
      users: [],
      loading: true,
    });
    firestore()
      .collection('Users')
      .where('isAdmin', '==', 'false')
      .get()
      .then((d) => {
        var users = [];
        d.docs.forEach((u) => {
          users.push(u.data());
        });
        this.setState({
          users: users,
          loading: false,
          found: users.length != 0,
        });
      });
  };

  edit = (email) => {
    this.props.navigation.navigate('UserEdit', {
      email: email,
    });
  };
  delete = (email) => {
    firestore()
      .collection('Users')
      .where('email', '==', email)
      .get()
      .then((d) => {
        var person = d.docs[0].id;
        console.log(person);
        firestore()
          .collection('Users')
          .doc(person)
          .delete()
          .then(() => {
            this.GetUsers();
          });
      });
  };

  render() {
    return (
      <ScrollView>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('profile')}>
          <View
            style={{
              marginLeft: 15,
              marginTop: 15,
            }}>
            <ImageBackground
              source={{
                uri:
                  'https://image.flaticon.com/icons/png/512/3135/3135715.png',
              }}
              style={{
                width: 50,
                height: 50,
              }}
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            marginTop: w * 0.1,
          }}>
          <Text
            style={{
              fontSize: 21,
              textAlign: 'center',
            }}>
            {' '}
            Welcome {this.state.username}
          </Text>
        </View>

        <View
          style={{
            width: '100%',
            // height: '100%',
            padding: 18,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 30,
            }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('ShowExams');
              }}>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <ImageBackground
                  source={require('./../assets/test.png')}
                  style={{
                    width: 80,
                    height: 80,
                  }}
                />
                <Text
                  style={{
                    marginTop: 8,
                    fontSize: 21,
                  }}>
                  Exam
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('ShowStudents');
              }}>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <ImageBackground
                  source={require('./../assets/reading-book.png')}
                  style={{
                    width: 80,
                    height: 80,
                  }}
                />
                <Text
                  style={{
                    marginTop: 8,
                    fontSize: 21,
                  }}>
                  Student
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 30,
            }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('History');
              }}>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <ImageBackground
                  source={require('./../assets/notepad.png')}
                  style={{
                    width: 80,
                    height: 80,
                  }}
                />
                <Text
                  style={{
                    marginTop: 8,
                    fontSize: 21,
                  }}>
                  History
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('ShowUsers');
              }}>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <ImageBackground
                  source={require('./../assets/744422.png')}
                  style={{
                    width: 80,
                    height: 80,
                  }}
                />
                <Text
                  style={{
                    marginTop: 8,
                    fontSize: 21,
                  }}>
                  Users
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            padding: 10,
            width: '100%',
          }}>
          <TouchableOpacity
            onPress={async () => {
              this.logout();
            }}>
            <View
              style={{
                borderRadius: 12,
                width: '100%',
                height: 50,
                backgroundColor: '#00b4d8',
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                elevation: 3,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#Fff',
                  fontSize: 19,
                }}>
                Log Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
