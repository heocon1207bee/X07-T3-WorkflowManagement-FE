import {Routes as Switch, Route} from 'react-router-dom';
import ProjectListPage from './pages/ProjectListPage';

function App() {
  return (
    <Switch>
      <Route path="/" element={<ProjectListPage/>}/>
      <Route path="/about" element={<p>About</p>}/>
    </Switch>
  );
}

export default App;
