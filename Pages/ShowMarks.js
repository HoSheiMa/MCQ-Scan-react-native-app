import React, {Component} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
const w = Dimensions.get('screen').width;
const h = Dimensions.get('screen').height;
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export default class ShowMarks extends Component {
  state = {
    SheetMarks: {},
    Student: null,
    Sheet: null,
    FinalCompare: {},
    empty: 0,
    success: 0,
    fail: 0,
  };
  componentDidMount() {
    this.setState({
      SheetMarks: this.props.route.params['SheetMarks'],
      StudentMarks: this.props.route.params['StudentMarks'],
    });
    for (var i in Object.keys(this.props.route.params['SheetMarks'])) {
      var key = Object.keys(this.props.route.params['SheetMarks'])[i];
      var SheetMarks = this.props.route.params['SheetMarks'];
      var StudentMarks = this.props.route.params['StudentMarks'];
      var finalValue = '';
      var FinalCompare = this.state.FinalCompare;

      if (SheetMarks[key] == 'EMPTY/INVALID') {
        this.state.empty = this.state.empty++;
        finalValue = 'EMPTY/INVALID - MAIN EXAM EMPTY';
        FinalCompare[key] = finalValue;
        console.log(FinalCompare);
        this.setState({
          FinalCompare: FinalCompare,
        });
        continue;
      }

      if (StudentMarks[key] == 'EMPTY/INVALID') {
        this.state.empty = this.state.empty++;
        finalValue = 'EMPTY/INVALID - STUDENT EXAM EMPTY';
        FinalCompare[key] = finalValue;
        this.setState({
          FinalCompare: FinalCompare,
        });
        continue;
      }

      if (SheetMarks[key] == StudentMarks[key]) {
        this.state.success = this.state.success++;
        finalValue = SheetMarks[key] + ' - TRUE';
        FinalCompare[key] = finalValue;
        this.setState({
          FinalCompare: FinalCompare,
        });
        continue;
      } else {
        this.state.fail = this.state.fail++;
        finalValue = SheetMarks[key] + ' - FALSE';
        FinalCompare[key] = finalValue;
        this.setState({
          FinalCompare: FinalCompare,
        });
        continue;
      }
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
        {Object.keys(this.state.FinalCompare).map((d) => {
          return (
            <View
              style={{
                width: w,
                padding: 35,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                shadowRadius: 1,
                backgroundColor: '#fff',
                marginTop: 15,
                shadowColor: '#000',
                shadowOpacity: 0.1,
              }}>
              <Text
                style={{
                  width: '50%',
                }}>
                {d}
              </Text>
              <Text
                style={{
                  width: '50%',
                }}>
                [{this.state.FinalCompare[d]}]
              </Text>
            </View>
          );
        })}
      </ScrollView>
    );
  }
}
