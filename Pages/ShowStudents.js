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
export default class ShowStudents extends Component {
  state = {
    Students: [],
    loading: true,
    found: false,
    isAdmin: false,
  };
  async componentDidMount() {
    var isAdmin = await _retrieveData('isAdmin');
    this.setState({
      isAdmin: isAdmin,
    });
    this.GetStudents();
  }
  edit = (id) => {
    this.props.navigation.navigate('StudentsEdit', {
      id: id,
    });
  };

  delete = (id) => {
    firestore()
      .collection('Students')
      .where('id', '==', id)
      .get()
      .then((d) => {
        var person = d.docs[0].id;
        console.log(person);
        firestore()
          .collection('Students')
          .doc(person)
          .delete()
          .then(() => {
            this.GetStudents();
          });
      });
  };

  GetStudents = () => {
    firestore()
      .collection('Students')
      .get()
      .then((d) => {
        var Students = [];
        d.docs.forEach((u) => {
          Students.push(u.data());
        });

        this.setState(
          {
            Students: Students,
            loading: false,
            found: Students.length != 0,
          },
          () => {
            console.log(this.state);
          },
        );
      });
  };
  render() {
    return (
      <ScrollView style={{}}>
        <View
          style={{
            width: '100%',
            padding: 15,
          }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('AddStudents');
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
                +add Student
              </Text>
            </View>
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
              {this.state.Students.map((d) => {
                return (
                  <View
                    key={JSON.stringify(d)}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 20,
                    }}>
                    <View>
                      <ImageBackground
                        style={{
                          width: w * 0.6,
                          margin: 7,
                          height: 250,
                        }}
                        source={{uri: d['imageurl']}}></ImageBackground>
                      <View
                        style={{
                          width: w * 0.5,
                        }}>
                        <Text>id: {d['id']}</Text>
                        <Text>name: {d['name']}</Text>
                        <Text>section: {d['section']}</Text>
                        <Text>set: {d['set']}</Text>
                      </View>
                    </View>
                    {this.state.isAdmin == 'true' ? (
                      <View></View>
                    ) : (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            this.delete(d['id']);
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
                            this.edit(d['id']);
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
                    )}
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}
