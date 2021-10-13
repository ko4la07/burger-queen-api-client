import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useEffect} from 'react';
import Auth from './components/Auth';

import Home from './components/Home';

function App() {

  const initialUrl = 'https://lim015-burger-queen-api.herokuapp.com';

  const fetchApi = (url) => {
    fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error))
  };
  // hook de react
  useEffect (() => {
    fetchApi(initialUrl);
  }, []) // [] significa que no tiene dependencias y entonces se va ejecutar al iniciar la aplicación

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Auth}/>
        <Route path="/home" component={Home}/>
      </Switch>
    </Router>
  )
}

export default App;
