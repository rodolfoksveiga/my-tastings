import { BrowserRouter, Route, Switch } from 'react-router-dom'

import '../App.css'

import Nav from './Nav'
import Home from '../pages/home/Home'
import Tastings from '../pages/tastings/Tastings'
import Tasting from '../pages/tastings/Tasting'
import About from '../pages/about/About'
import Login from '../pages/login/Login'

// Component
export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <main>
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/tastings/' exact component={Tastings}/>
          <Route path='/tastings/:id/' exact component={Tasting}/>
          <Route path='/about/' exact component={About}/>
          <Route path='/login/' exact component={Login}/>
        </Switch>
      </main>
      
    </BrowserRouter>
    )
}