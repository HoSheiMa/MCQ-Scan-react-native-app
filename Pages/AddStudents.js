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

export default class AddStudents extends Component {
  state = {
    name: null,
    section: null,
    id: null,
    set: null,
    imagePath: null,
    imageSaved: null,
    docsId: null,
    loading: false,
  };
  Add = async () => {
    if (
      !this.state.name |
      !this.state.section |
      !this.state.id |
      !this.state.set |
      !this.state.imageSaved |
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
      .collection('Students')
      .add({
        name: this.state.name,
        section: this.state.section,
        id: this.state.id,
        set: this.state.set,
        imageurl: ImgUrl,
      })
      .then(async () => {
        var userId = JSON.parse(await _retrieveData('userData'))['email'];
        firestore()
          .collection('History')
          .add({
            message: 'User add a new student!.',
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
            source={require('./../assets/reading-book.png')}
          />
        </View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 21,
            marginTop: 10,
          }}>
          Add Student
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
            defaultValue={this.state.name}
            placeholder="Name"
            onChange={(d) => {
              this.setState({
                name: d.nativeEvent.text,
              });
            }}
          />
          <TextInput
            style={{
              borderBottomWidth: 1,
              marginBottom: 5,
              marginTop: 5,
            }}
            defaultValue={this.state.section}
            placeholder="Section"
            onChange={(d) => {
              this.setState({
                section: d.nativeEvent.text,
              });
            }}
          />

          <TextInput
            style={{
              borderBottomWidth: 1,
              marginBottom: 5,
              marginTop: 5,
            }}
            defaultValue={this.state.id}
            placeholder="ID"
            onChange={(d) => {
              this.setState({
                id: d.nativeEvent.text,
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
                set: d.nativeEvent.text,
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
              this.Add();
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
                {this.state.loading ? 'Loading' : 'Add'}
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
