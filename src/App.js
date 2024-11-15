import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Completed from "./Completed";
import Proceeding from "./Proceeding";
import Important from "./Important";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// test 1

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Completed" element={<Completed />}></Route>
          <Route path="/proceeding" element={<Proceeding />}></Route>
          <Route path="/important" element={<Important />}></Route>
        </Routes>

        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover
          theme="dark"
        />
      </BrowserRouter>
    </div>
  );
};

export default App;
