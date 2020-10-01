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
export default class userDashBourd extends Component {
  state = {};
  async componentWillMount() {
    var isAdmin = await _retrieveData('isAdmin');
    if (isAdmin == 'true') {
      this.props.navigation.replace('AdminDashBoard');
    }

    var userData = await _retrieveData('userData');
    this.setState(JSON.parse(userData));
  }
  logout = async () => {
    await _storeData('isLogIn', 'false');
    await _storeData('userData', '{}');
    await _storeData('isAdmin', 'false');
    this.props.navigation.replace('Intro');
  };
  render() {
    return (
      <View>
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
        <Text
          style={{
            textAlign: 'center',
            fontSize: 26,
            marginTop: w * 0.1,
          }}>
          welcome {this.state.username}{' '}
        </Text>

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
                this.props.navigation.navigate('Result');
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
                  Result
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            padding: 10,
            width: '100%',
            height: h,
            justifyContent: 'flex-end',
            padding: w * 0.2,
            position: 'absolute',
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
      </View>
    );
  }
}
