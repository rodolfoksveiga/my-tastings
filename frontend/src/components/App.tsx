// Import components, functions, types, variables, and styles
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import NavigationBar from './NavigationBar'
import Home from './Home'
import TastingsList from './TastingsList'
import CreateTasting from './CreateTasting'
import Tasting from './TastingDetails'
import UpdateTasting from './UpdateTasting'
import BeveragesList from './BeveragesList'
import Login from './Login'
import Register from './Register'
import Activate from './Activate'
import ResetPassword from './ResetPassword'
import ConfirmResetPassword from './ConfirmResetPassword'
import checkUserAuth from '../actions/checkUserAuth'
import loadUser from '../actions/loadUser'


// Types and interfaces
interface IAppProps {
    checkUserAuth: Function
    loadUser: Function
}


// Main component
export function App({ checkUserAuth, loadUser }: IAppProps) {
    useEffect(() => {
        checkUserAuth()
        loadUser()
    }, [checkUserAuth, loadUser])

    return (
        <BrowserRouter>
            <NavigationBar />
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/register/' exact component={Register} />
                <Route path='/login/' exact component={Login} />
                <Route path='/activate/:userId/:token/' exact component={Activate} />
                <Route path='/reset-password/' exact component={ResetPassword} />
                <Route path='/reset-password-confirm/:userId/:token/' exact component={ConfirmResetPassword} />
                <Route path='/tastings/' exact component={TastingsList} />
                <Route path='/tastings/create/' exact component={CreateTasting} />
                <Route path='/tastings/:id/' exact component={Tasting} />
                <Route path='/tastings/:id/update/' exact component={UpdateTasting} />
                <Route path='/beverages/' exact component={BeveragesList} />
            </Switch>
        </BrowserRouter>
    )
}

export default connect(null, { checkUserAuth, loadUser })(App)
