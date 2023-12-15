
import {Routes,Route} from 'react-router-dom'
import UpdateUser from './components/UpdateUser';
import Home from './components/Home';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/update/:userID/:cname' element={<UpdateUser/>} />
        <Route path='/' element={<Home/>} />
      </Routes>
     
    </div>
  );
}

export default App;
