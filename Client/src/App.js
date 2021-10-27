import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Switch,Route } from 'react-router-dom';

import UserLogin from './Components/Pages/UserLogin';
import Register from './Components/Pages/Register';
import Categories from './Components/Pages/Categories';
import Questions from './Components/Pages/Questions';
import Leaderboard from './Components/Pages/Leaderboard';

function App() {
  return (
    <>
    <Router>
      <Switch>
      <Route path='/' exact component={UserLogin}></Route>    
      <Route path='/register' component={Register}></Route>     
      <Route path="/categories" component={Categories}></Route>
      <Route path="/questions/:id" component={Questions}></Route>
      <Route path="/leaderboard" component={Leaderboard}></Route>
      </Switch>
    </Router>
    </>
  );
}

export default App;
