import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {_retrieveData, _storeData} from './assets/functions';
import ImagePicker from 'react-native-image-picker';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import RNFetchBlob from 'react-native-fetch-blob';
import storage from '@react-native-firebase/storage';

const w = Dimensions.get('screen').width;
const h = Dimensions.get('screen').height;

// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
// window.Blob = Blob;

export default class UploadSheets extends Component {
  state = {
    Exam_Name: null,
    Faculty: null,
    Year: null,
    imageSaved: false,
    Set: null,
    imagePath: null,
    loading: false,
  };

  uploadSheets = async () => {
    if (
      !this.state.Exam_Name |
      !this.state.Faculty |
      !this.state.Year |
      !this.state.imageSaved |
      !this.state.Set |
      !this.state.imagePath
    )
      return;
    this.setState({
      loading: true,
    });

    var url = await this.uploadImage(this.state.imagePath);
    var ref = storage().ref(url);
    var ImgUrl = await ref.getDownloadURL();
    firestore()
      .collection('Sheets')
      .add({
        Exam_Name: this.state.Exam_Name,
        Faculty: this.state.Faculty,
        Year: this.state.Year,
        imageurl: ImgUrl,
        Set: this.state.Set,
      })
      .then(async () => {
        var userId = JSON.parse(await _retrieveData('userData'))['email'];
        firestore()
          .collection('History')
          .add({
            message: 'User upload a sheet!.',
            userId: userId,
            date: `${new Date().toGMTString()}`,
          });
        this.props.navigation.goBack();
      });
  };

  uploadImage = (uri) => {
    const imageRef = storage()
      .ref('images')
      .child('image_' + Date.now());
    return imageRef
      .putFile(uri)
      .then((d) => {
        return d['metadata']['fullPath'];
      })
      .catch((e) => {
        console.log('ee :', e);
      });
  };

  takeImage = async () => {
    const options = {
      title: 'Select Sheet',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    ImagePicker.showImagePicker(options, (response) => {
      //   console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        var date = new Date();
        date = date.toISOString();
        this.setState({
          imagePath: response.path,
          imageSaved: true,
        });
      }
    });
  };
  render() {
    return (
      <KeyboardAvoidingView behavior={'position'}>
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
          Exam
        </Text>
        <View
          style={{
            padding: 15,
          }}>
          <TextInput
            style={{
              borderBottomWidth: 1,
              marginBottom: 5,
              marginTop: 5,
            }}
            defaultValue={this.state.Exam_Name}
            placeholder="Exam Name"
            onChange={(d) => {
              this.setState({
                Exam_Name: d.nativeEvent.text,
              });
            }}
          />
          <TextInput
            style={{
              borderBottomWidth: 1,
              marginBottom: 5,
              marginTop: 5,
            }}
            defaultValue={this.state.Faculty}
            placeholder="Faculty"
            onChange={(d) => {
              this.setState({
                Faculty: d.nativeEvent.text,
              });
            }}
          />

          <TextInput
            style={{
              borderBottomWidth: 1,
              marginBottom: 5,
              marginTop: 5,
            }}
            defaultValue={this.state.Year}
            placeholder="Year"
            onChange={(d) => {
              this.setState({
                Year: d.nativeEvent.text,
              });
            }}
          />
          <TextInput
            style={{
              borderBottomWidth: 1,
              marginBottom: 5,
              marginTop: 5,
            }}
            defaultValue={this.state.Set}
            placeholder="Set"
            onChange={(d) => {
              this.setState({
                Set: d.nativeEvent.text,
              });
            }}
          />
          <TouchableOpacity
            style={{
              alignItems: 'center',
              marginTop: 15,
            }}
            onPress={() => {
              // eslint-disable-next-line react/prop-types
              this.takeImage();
            }}>
            <View
              style={{
                backgroundColor: this.state.imageSaved ? '#1a936f' : '#ff7f56',
                width: 250,
                height: 60,
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 8,
                elevation: 3,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 19,
                }}>
                Attach answers sheet
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              alignItems: 'center',
              marginTop: 15,
            }}
            onPress={() => {
              // eslint-disable-next-line react/prop-types
              this.uploadSheets();
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
                elevation: 3,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 19,
                }}>
                {this.state.loading ? 'loading' : 'Upload'}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              marginTop: 15,
            }}
            onPress={() => {
              // eslint-disable-next-line react/prop-types
              this.props.navigation.goBack();
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                width: 250,
                height: 60,
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 8,
                elevation: 3,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 19,
                }}>
                Back
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
