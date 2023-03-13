import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddEdit from './pages/AddEdit';
import "./App.css"
import View from './pages/View';

function App() {
  return (
    <div className="App">
      <ToastContainer position='top-right' />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/addUser" element={<AddEdit />}></Route>
        <Route path="/update/:id" element={<AddEdit />}></Route>
        <Route path="/view/:id" element={<View />}></Route>
      </Routes>
    </div>
  );
}

export default App;
