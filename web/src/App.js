import logo from './logo.svg';
import './App.css';
import {LoginScreen} from './screens/LoginScreen';
import {Routes, Route} from 'react-router-dom'

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path={"/"} element={<h6>Start screen</h6>}/>
                <Route path={"login"} element={<LoginScreen/>}/>
            </Routes>
        </div>
    );
}

export default App;
