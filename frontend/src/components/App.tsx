import { BrowserRouter, Route, Switch } from 'react-router-dom'

import '../App.css'

import Nav from './Nav'
// import Home from '../pages/home/Home'
import Tastings from '../pages/tastings/Tastings'
// import About from '../pages/about/About'
// import Login from '../pages/login/Login'

// Component
export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route path='/tastings/' exact component={Tastings}/>
      </Switch>
    </BrowserRouter>
    )
}