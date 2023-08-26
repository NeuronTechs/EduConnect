import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout/defaultLayout";
import Home from "./pages/Home";
import { setupInterceptor } from "./utils/interceptor";
function App() {
  setupInterceptor();
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
