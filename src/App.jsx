import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import AddStudent from './pages/AddStudent';
import EditStudent from './pages/EditStudent';
import ViewStudent from './pages/ViewStudent';
import Login from './components/Login';





function App() {
  return (
    <div className="App h-screen ">
     
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/Home' element={<Home/>}/>
        <Route path='/addStudent' element={<AddStudent />} />
        <Route path='/editStudent/:id' element={<EditStudent/>} />
        <Route path='/viewStudent/:id' element={<ViewStudent/>} />
        <Route path='*' element={<PageNotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
