import React, {Component} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
const w = Dimensions.get('screen').width;
const h = Dimensions.get('screen').height;
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {_retrieveData, _storeData} from './assets/functions';

export default class Result extends Component {
  state = {
    loading: false,
    Sheets: [],
    Students: [],
    Sheet: '',
    Student: '',
    error: false,
    DataOfExam: null,
    DataOfStudentExam: null,
  };

  getDataOfExam = () => {
    var Sheet = this.state.Sheet;
    if (Sheet) {
      this.setState({
        loading: true,
        error: false,
      });
      firestore()
        .collection('Sheets')
        .where('Exam_Name', '==', this.state.Sheet)
        .get()
        .then(async (d) => {
          var d = d.docs[0].data();
          var ImgUrl = d['imageurl'];
          var FullUrl =
            'https://sleepy-sea-71464.herokuapp.com/uploadImage?imgURL=' +
            ImgUrl;

          var request = new XMLHttpRequest();
          request.onreadystatechange = async (e) => {
            if (request.readyState !== 4) {
              return;
            }

            if (request.status === 200) {
              var userId = JSON.parse(await _retrieveData('userData'))['email'];
              this.setState(
                {
                  DataOfExam: JSON.parse(request.responseText),
                },
                () => {
                  this.getDataOfStudentExam();

                  firestore()
                    .collection('History')
                    .add({
                      message: 'User see a result of exam!.',
                      userId: userId,
                      date: `${new Date().toGMTString()}`,
                    });
                },
              );
            } else {
              console.log('error', request.status, FullUrl);
              this.setState({
                loading: false,
                error: true,
              });
            }
          };

          request.open('GET', FullUrl);
          request.send();
        });
    }
  };

  getDataOfStudentExam = () => {
    var Student = this.state.Student;
    if (Student) {
      this.setState({
        loading: true,
        error: false,
      });
      firestore()
        .collection('Students')
        .where('name', '==', this.state.Student)
        .get()
        .then(async (d) => {
          var d = d.docs[0].data();
          var ImgUrl = d['imageurl'];
          var FullUrl =
            'https://sleepy-sea-71464.herokuapp.com/uploadImage?imgURL=' +
            ImgUrl;

          var request = new XMLHttpRequest();
          request.onreadystatechange = async (e) => {
            if (request.readyState !== 4) {
              return;
            }

            if (request.status === 200) {
              var userId = JSON.parse(await _retrieveData('userData'))['email'];
              this.setState(
                {
                  DataOfStudentExam: JSON.parse(request.responseText),
                },
                () => {
                  this.ShowMarks();
                  firestore()
                    .collection('History')
                    .add({
                      message: 'User see a result of exam!.',
                      userId: userId,
                      date: `${new Date().toGMTString()}`,
                    });
                },
              );
            } else {
              console.log('error', request.status, FullUrl);
              this.setState({
                loading: false,
                error: true,
              });
            }
          };

          request.open('GET', FullUrl);
          request.send();
        });
    }
  };

  Scan = () => {
    this.getDataOfExam();
  };
  ShowMarks = () => {
    console.log(this.state.DataOfExam, this.state.Student);
    this.props.navigation.navigate('ShowMarks', {
      SheetMarks: this.state.DataOfExam,
      StudentMarks: this.state.DataOfStudentExam,
    });
  };
  componentWillMount() {
    firestore()
      .collection('Sheets')
      .get()
      .then((d) => {
        var Sheets = [];
        d.docs.forEach((u) => {
          var cd = u.data();
          cd['label'] = u.data()['Exam_Name'];
          cd['key'] = u.data()['Exam_Name'];
          Sheets.push(cd);
        });
        firestore()
          .collection('Students')
          .get()
          .then((d) => {
            var Students = [];
            d.docs.forEach((u) => {
              var cd = u.data();
              cd['label'] = u.data()['name'];
              cd['key'] = u.data()['name'];
              cd['section'] = false;
              Students.push(cd);
            });
            this.setState({
              Students: Students,
              Sheets: Sheets,
              loading: false,
            });
          });
      });
  }

  render() {
    return (
      <View>
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
            source={require('./../assets/744422.png')}
          />
        </View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 21,
            marginTop: 10,
          }}>
          Result
        </Text>

        <View
          style={{
            marginTop: 20,
            paddingLeft: 18,
            paddingRight: 18,
          }}>
          <Text
            style={{
              fontSize: 19,
            }}>
            Student Name
          </Text>
          <View
            style={{
              marginTop: 20,
            }}>
            <ModalSelector
              data={this.state.Students}
              initValue="Select Student"
              onChange={(option) => {
                this.setState({
                  Student: option.label,
                });
                // alert(`${option.label} (${option.key}) nom nom nom`);
              }}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            paddingLeft: 18,
            paddingRight: 18,
          }}>
          <Text
            style={{
              fontSize: 19,
            }}>
            Exam Name
          </Text>
          <View
            style={{
              marginTop: 20,
            }}>
            <ModalSelector
              data={this.state.Sheets}
              initValue="Select Sheet"
              onChange={(option) => {
                this.setState({
                  Sheet: option.label,
                });
                // alert(`${option.label} (${option.key}) nom nom nom`);
              }}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            padding: 16,
            paddingLeft: 18,
          }}>
          {this.state.error ? (
            <Text
              style={{
                color: '#d90429',
                margin: 6,
              }}>
              Error: Image is not accepted for this process
            </Text>
          ) : (
            <View />
          )}
          <TouchableOpacity
            onPress={() => this.Scan()}
            style={{
              borderRadius: 8,
              backgroundColor: '#ff7f56',
              width: '100%',
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 19,
              }}>
              {this.state.loading ? 'Loading...' : 'Start Scan'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{
              borderRadius: 8,
              backgroundColor: '#ff7f56',
              width: '100%',
              marginTop: 15,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 19,
              }}>
              Back
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
