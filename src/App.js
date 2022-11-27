import './App.css';
import { Routes as Switch, Route } from 'react-router-dom';
import { UserInfroPage } from './pages/UserInfroPage';



function App() {
  return (
    <Switch>
        <Route path='/' element={<UserInfroPage/>}/>
    </Switch>
  );
}

export default App;
