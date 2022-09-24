import React from 'react';
import './App.css';
import LeftDrawer from "./components/common/LeftDrawer";
import {Route, Routes} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path={"/"} element={<LeftDrawer/>}/>
            <Route path={"login"} element={<LeftDrawer/>}/>
        </Routes>
    </div>
  );
}

export default App;
