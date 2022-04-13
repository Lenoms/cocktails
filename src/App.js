import './App.css';
import Header from './components/Header';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import TriedList from './components/TriedList';
import UntriedList from './components/UntriedList';

function App() {

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route exact path="/tried" element={<TriedList/>}></Route>
        <Route exact path="/untried" element={<UntriedList/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
