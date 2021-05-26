// Import components, functions, types, variables, and styles
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Nav from './Nav'
import Home from './Home'
import Tastings from './Tastings'
import CreateTasting from './CreateTasting'
import Tasting from './Tasting'
import UpdateTasting from './UpdateTasting'
import About from './About'
import Login from './Login'
import Logout from './Logout'
import Register from './Register'


import TestTastings from './TestTastings'
import TestTasting from './TestTasting'


// Main component
export default function App() {
    return (
        <BrowserRouter>
            <Nav />
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/tastings/' exact component={Tastings} />
                <Route
                    path='/tastings/create/'
                    exact
                    component={CreateTasting}
                />
                <Route path='/tastings/:id/' exact component={Tasting} />
                <Route
                    path='/tastings/:id/update/'
                    exact
                    component={UpdateTasting}
                />
                <Route path='/about/' exact component={About} />
                <Route path='/login/' exact component={Login} />
                <Route path='/logout/' exact component={Logout} />
                <Route path='/register/' exact component={Register} />

                <Route path='/testtastings/' exact component={TestTastings} />
                <Route path='/testtastings/:id/' exact component={TestTasting} />

            </Switch>
        </BrowserRouter>
    )
}
