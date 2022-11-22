import {Routes as Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route path="/" element={<p>Home</p>}/>
      <Route path="/about" element={<p>About</p>}/>
    </Switch>
  );
}

export default App;
