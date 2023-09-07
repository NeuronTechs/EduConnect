import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout/defaultLayout";
import { setupInterceptor } from "./utils/interceptor";
import RegisterInformation from "./pages/RegisterInformation";
function App() {
  setupInterceptor();
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/register-information"
            element={<RegisterInformation />}
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
