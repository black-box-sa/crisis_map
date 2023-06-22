import './App.css';
import Map from './components/Leaflet';
import CapeTownMap from './components/CapeTownMap';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Map/>}/>
        <Route path="/capetown" element={<CapeTownMap/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
