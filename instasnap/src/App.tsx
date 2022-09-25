import React from 'react';
import './App.css';
import LeftDrawer from "./components/common/LeftDrawer";
import {Route, Routes, Navigate} from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import {SignUpScreen} from "./screens/SignUpScreen";
import {NavigationLocations} from "./util/navigation/NavigationLocations";
import Facebook from "./screens/MainScreen";

function App() {
  return (
      <div className="App">
          <Routes>
              <Route path={NavigationLocations.DEFAULT} element={<Navigate to={NavigationLocations.LOGIN}/>}/>
              <Route path={NavigationLocations.LOGIN} element={<LoginScreen/>}/>
              <Route path={NavigationLocations.SIGN_UP} element={<SignUpScreen/>}/>
              <Route path={NavigationLocations.MAIN} element={<LeftDrawer content={<Facebook/>}/>}/>
          </Routes>
      </div>
  );
}

export default App;
