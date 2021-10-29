import logo from "./logo.svg";
import "./App.css";
import RadarChart from "./components/RadarChart";
import UploadFile from "./components/UploadFile";
function App() {
  return (
    <div>
      <div>
        <UploadFile></UploadFile>
      </div>
      <div>
        <RadarChart></RadarChart>
      </div>
    </div>
  );
}

export default App;
