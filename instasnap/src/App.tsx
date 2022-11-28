import React from 'react';
import './App.css';
import LeftDrawer from "./components/common/LeftDrawer";
import {Route, Routes, Navigate} from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import {SignUpScreen} from "./screens/SignUpScreen";
import {NavigationLocations} from "./util/navigation/NavigationLocations";
import Facebook from "./screens/MainScreen";
import {observer} from "mobx-react-lite";
import ProfileSettingsScreen from "./screens/ProfileSettingsScreen";

function App() {
  return (
      <div className="App">
          <Routes>
              <Route path={NavigationLocations.DEFAULT} element={<Navigate to={NavigationLocations.LOGIN}/>}/>
              <Route path={NavigationLocations.LOGIN} element={<LoginScreen/>}/>
              <Route path={NavigationLocations.SIGN_UP} element={<SignUpScreen/>}/>
              <Route path={NavigationLocations.MAIN} element={<LeftDrawer content={<Facebook/>}/>}/>
              <Route path={NavigationLocations.SETTINGS} element={<LeftDrawer content={<ProfileSettingsScreen/>}/>}/>
          </Routes>
      </div>
  );
}

export default observer(App);
