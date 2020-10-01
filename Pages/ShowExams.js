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

import storage from '@react-native-firebase/storage';

const w = Dimensions.get('screen').width;
const h = Dimensions.get('screen').height;
export default class ShowExam extends Component {
  state = {
    Sheets: [],
    loading: true,
    found: false,
    isAdmin: false,
  };
  async componentDidMount() {
    var isAdmin = await _retrieveData('isAdmin');

    this.setState({
      isAdmin: isAdmin,
    });
    this.GetSheets();
  }
  edit = (Exam_Name) => {
    this.props.navigation.navigate('ExamEdit', {
      Exam_Name: Exam_Name,
    });
  };

  delete = (Exam_Name) => {
    firestore()
      .collection('Sheets')
      .where('Exam_Name', '==', Exam_Name)
      .get()
      .then((d) => {
        var person = d.docs[0].id;
        console.log(person);
        firestore()
          .collection('Sheets')
          .doc(person)
          .delete()
          .then(() => {
            this.GetSheets();
          });
      });
  };
  GetSheets = () => {
    var Sheets = [];

    firestore()
      .collection('Sheets')
      .get()
      .then((d) => {
        d.docs.forEach((v) => {
          var dd = v.data();
          Sheets.push(dd);
        });
        this.setState({
          Sheets: Sheets,
          loading: false,
          found: Sheets.length != 0,
        });
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
              this.props.navigation.navigate('UploadSheets');
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
                +add Sheet
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
              {this.state.Sheets.map((d) => {
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
                          width: w * 0.7,
                          margin: 7,
                          height: 250,
                        }}
                        source={{uri: d['imageurl']}}></ImageBackground>
                      <View>
                        <Text>Exam_Name: {d['Exam_Name']}</Text>
                        <Text>Faculty: {d['Faculty']}</Text>
                        <Text>Set: {d['Set']}</Text>
                        <Text>Year: {d['Year']}</Text>
                      </View>
                    </View>
                    {this.state.isAdmin == 'true' ? (
                      <View></View>
                    ) : (
                      <View
                        style={{
                          alignItems: 'center',
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            this.delete(d['Exam_Name']);
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
                            this.edit(d['Exam_Name']);
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
