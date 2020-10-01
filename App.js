/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import ToastExample from './Pages/ToastExample';

import {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Intro from './Pages/Intro';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import UserDashBourd from './Pages/UserDashBourd';
import AdminDashBoard from './Pages/AdminDashBoard';
import UserEdit from './Pages/UserEdit';
import AddUser from './Pages/AddUser';
import UploadSheets from './Pages/UploadSheets';
import Result from './Pages/Result';
import AddStudents from './Pages/AddStudents';
import History from './Pages/History';
import Forget from './Pages/Forget';
import Profile from './Pages/Profile';
import ShowStudents from './Pages/ShowStudents';
import ShowExams from './Pages/ShowExams';
import ExamEdit from './Pages/ExamEdit';
import StudentsEdit from './Pages/StudentsEdit';
import ShowMarks from './Pages/ShowMarks';
import ShowUsers from './Pages/ShowUsers';

export default class App extends Component {
  render() {
    const Stack = createStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Intro"
            component={Intro}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Login"
            component={Login}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="SignUp"
            component={SignUp}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="UserDashBourd"
            component={UserDashBourd}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="AdminDashBoard"
            component={AdminDashBoard}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="UserEdit"
            component={UserEdit}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="AddUser"
            component={AddUser}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="UploadSheets"
            component={UploadSheets}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Result"
            component={Result}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="AddStudents"
            component={AddStudents}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="History"
            component={History}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Forget"
            component={Forget}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="profile"
            component={Profile}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="ShowStudents"
            component={ShowStudents}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="ShowExams"
            component={ShowExams}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="StudentsEdit"
            component={StudentsEdit}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="ExamEdit"
            component={ExamEdit}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="ShowMarks"
            component={ShowMarks}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="ShowUsers"
            component={ShowUsers}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
