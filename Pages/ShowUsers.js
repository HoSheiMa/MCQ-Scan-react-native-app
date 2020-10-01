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

export default class ShowUsers extends Component {
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
      <View>
        <View
          style={{
            padding: 15,
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
          }}>
          <View
            style={{
              margin: 10,
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('AddUser');
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
                <ImageBackground
                  source={require('./../assets/add.png')}
                  style={{
                    width: 30,
                    height: 30,
                    marginRight: 6,
                  }}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#Fff',
                    fontSize: 19,
                  }}>
                  Add User
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              margin: 10,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 19,
                margin: 3,
              }}>
              Users
            </Text>
            <TouchableOpacity onPress={() => this.GetUsers()}>
              <ImageBackground
                style={{
                  width: 40,
                  height: 40,
                }}
                source={require('./../assets/synchronization.png')}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              borderRadius: 18,
              elevation: 3,
              width: '100%',
              padding: 15,
              backgroundColor: '#fff',
            }}>
            {!this.state.found || this.state.loading ? (
              this.state.loading ? (
                <Text
                  style={{
                    textAlign: 'center',
                  }}>
                  loading...
                </Text>
              ) : (
                <Text
                  style={{
                    textAlign: 'center',
                  }}>
                  Not Found
                </Text>
              )
            ) : (
              <View>
                {this.state.users.map((d) => {
                  return (
                    <View
                      key={JSON.stringify(d)}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 6,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <ImageBackground
                          style={{
                            width: 50,
                            margin: 4,
                            height: 50,
                          }}
                          source={require('./../assets/user.png')}></ImageBackground>
                        <View>
                          <Text>{d['fname'] + ' ' + d['lname']}</Text>
                          <Text>@{d['username']}</Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            this.delete(d['email']);
                          }}
                          style={{
                            borderRadius: w,
                            borderWidth: 1,
                            margin: 6,
                            width: 35,
                            height: 35,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <ImageBackground
                            style={{
                              width: 20,
                              height: 20,
                            }}
                            source={require('./../assets/trash.png')}></ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            this.edit(d['email']);
                          }}
                          style={{
                            borderRadius: w,
                            borderWidth: 1,
                            margin: 6,
                            width: 35,
                            height: 35,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <ImageBackground
                            style={{
                              width: 20,
                              height: 20,
                            }}
                            source={require('./../assets/edit.png')}></ImageBackground>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }
}
